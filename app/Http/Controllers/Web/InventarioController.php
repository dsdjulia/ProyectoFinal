<?php

namespace App\Http\Controllers\Web;

use Exception;
use Inertia\Inertia;
use App\Models\Gasto;
use App\Models\Venta;
use App\Models\Producto;
use App\Models\DetalleVenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class InventarioController extends Controller
{
    public function dashboard(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        $userId = $user->id;

        $fechaInicio = now()->startOfMonth()->toDateTimeString();
        $fechaFin = now()->endOfMonth()->toDateTimeString();

        $fechaInicioAnterior = now()->subMonth()->startOfMonth()->toDateTimeString();
        $fechaFinAnterior = now()->subMonth()->endOfMonth()->toDateTimeString();

        try {
            // Total almacenes (actual y anterior)
            $totalAlmacenes = DB::table('almacenes')
                ->where('id_user', $userId)
                ->count();

            // No tienes histórico, ponemos 0 para anterior
            $totalAlmacenesAnterior = 0;

            // Total productos (actual y anterior)
            $totalProductos = Producto::count();
            $totalProductosAnterior = 0;

            // Total ventas (actual y anterior)
            $totalVentas = DetalleVenta::join('ventas', 'detalle_ventas.id_venta', '=', 'ventas.id')
                ->where('ventas.id_user', $userId)
                ->whereBetween('ventas.fecha_venta', [$fechaInicio, $fechaFin])
                ->select(DB::raw('SUM(detalle_ventas.cantidad * detalle_ventas.precio_unitario) as total'))
                ->value('total') ?? 0;

            $totalVentasAnterior = DetalleVenta::join('ventas', 'detalle_ventas.id_venta', '=', 'ventas.id')
                ->where('ventas.id_user', $userId)
                ->whereBetween('ventas.fecha_venta', [$fechaInicioAnterior, $fechaFinAnterior])
                ->select(DB::raw('SUM(detalle_ventas.cantidad * detalle_ventas.precio_unitario) as total'))
                ->value('total') ?? 0;

            // Total gastos (actual y anterior)
            $totalGastos = Gasto::where('id_user', $userId)
                ->whereBetween('fecha', [$fechaInicio, $fechaFin])
                ->sum('precio');

            $totalGastosAnterior = Gasto::where('id_user', $userId)
                ->whereBetween('fecha', [$fechaInicioAnterior, $fechaFinAnterior])
                ->sum('precio');

            // Beneficio mensual (actual y anterior)
            $beneficioMensual = $totalVentas - $totalGastos;
            $beneficioMensualAnterior = $totalVentasAnterior - $totalGastosAnterior;

            // Función para calcular crecimiento en porcentaje (ventas, beneficio)
            $calcGrowthPercent = function ($current, $previous) {
                if ($previous == 0) {
                    if ($current == 0) {
                        return '0%';
                    }
                    return 'N/A';
                }
                $growth = (($current - $previous) / abs($previous)) * 100;
                return ($growth >= 0 ? '+' : '') . round($growth, 1) . '%';
            };

            // Función para crecimiento absoluto (almacenes, productos)
            $calcGrowthAbsolute = function ($current, $previous) {
                $diff = $current - $previous;
                if ($previous == 0) {
                    if ($current == 0) return '0';
                    return 'Nuevo';
                }
                return ($diff > 0 ? '+' : '') . $diff;
            };

            // Calcular crecimientos
            $growthAlmacenes = $calcGrowthAbsolute($totalAlmacenes, $totalAlmacenesAnterior);
            $growthProductos = $calcGrowthAbsolute($totalProductos, $totalProductosAnterior);
            $growthVentas = $calcGrowthPercent($totalVentas, $totalVentasAnterior);
            $growthBeneficio = $calcGrowthPercent($beneficioMensual, $beneficioMensualAnterior);

            // Producto estrella
            $productoEstrella = Producto::select('productos.id', 'productos.nombre', 'productos.imagen', 'productos.descripcion', DB::raw('SUM(detalle_ventas.cantidad) as total_vendido'))
                ->join('detalle_ventas', 'productos.id', '=', 'detalle_ventas.id_producto')
                ->join('ventas', 'detalle_ventas.id_venta', '=', 'ventas.id')
                ->where('ventas.id_user', $userId)
                ->whereBetween('ventas.fecha_venta', [$fechaInicio, $fechaFin])
                ->groupBy('productos.id', 'productos.nombre', 'productos.imagen', 'productos.descripcion')
                ->orderByDesc('total_vendido')
                ->firstOrFail();

            // Ventas última semana
            $fechaInicioSemana = now()->subDays(6)->startOfDay()->toDateTimeString();
            $fechaFinSemana = now()->endOfDay()->toDateTimeString();

            $ventasUltimaSemana = DetalleVenta::join('ventas', 'detalle_ventas.id_venta', '=', 'ventas.id')
                ->where('ventas.id_user', $userId)
                ->whereBetween('ventas.fecha_venta', [$fechaInicioSemana, $fechaFinSemana])
                ->select(
                    DB::raw('DATE(ventas.fecha_venta) as fecha'),
                    DB::raw('SUM(detalle_ventas.cantidad * detalle_ventas.precio_unitario) as total')
                )
                ->groupBy('fecha')
                ->orderBy('fecha')
                ->get();

            // Gastos últimos 5 meses
            $fechaCincoMesesAntes = now()->subMonths(4)->startOfMonth()->toDateString();

            $gastosMensuales = Gasto::where('id_user', $userId)
                ->where('fecha', '>=', $fechaCincoMesesAntes)
                ->select(
                    DB::raw('DATE_FORMAT(fecha, "%Y-%m") as mes'),
                    DB::raw('SUM(precio) as total_gastos')
                )
                ->groupBy('mes')
                ->orderBy('mes')
                ->get();

            // Distribución ventas por categoría
            $distribucionVentas = Producto::select('categorias.nombre as categoria', DB::raw('SUM(detalle_ventas.cantidad) as total_vendido'))
                ->join('categorias', 'productos.id_categoria', '=', 'categorias.id')
                ->join('detalle_ventas', 'productos.id', '=', 'detalle_ventas.id_producto')
                ->join('ventas', 'detalle_ventas.id_venta', '=', 'ventas.id')
                ->where('ventas.id_user', $userId)
                ->whereBetween('ventas.fecha_venta', [$fechaInicio, $fechaFin])
                ->groupBy('categorias.nombre')
                ->orderByDesc('total_vendido')
                ->get();

            return Inertia::render('Dashboard', [
                'total_almacenes' => $totalAlmacenes,
                'growth_almacenes' => $growthAlmacenes,
                'total_productos' => $totalProductos,
                'growth_productos' => $growthProductos,
                'total_ventas' => round($totalVentas, 2),
                'growth_ventas' => $growthVentas,
                'beneficio_mensual' => round($beneficioMensual, 2),
                'growth_beneficio' => $growthBeneficio,
                'producto_estrella' => $productoEstrella,
                'ventas_ultima_semana' => $ventasUltimaSemana,
                'gastos_mensuales' => $gastosMensuales,
                'distribucion_ventas' => $distribucionVentas,
            ]);
        } catch (Exception $e) {
            Log::error('Error al obtener estadísticas: ' . $e->getMessage(), [
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Error interno al obtener las estadísticas. Inténtalo más tarde.',
            ], 500);
        }
    }
}
