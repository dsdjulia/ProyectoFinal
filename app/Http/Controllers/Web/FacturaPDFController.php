<?php

namespace App\Http\Controllers\Web;

use App\Models\Venta;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use App\Http\Controllers\Controller;

class FacturaPDFController extends Controller
{
    public function generar($id)
    {
        $venta = Venta::with(['detalleVentas', 'user', 'comprador'])->findOrFail($id);

       $total = $venta->detalleVentas->sum(fn($d) => $d->precio_unitario * $d->cantidad);


        $pdf = PDF::loadView('pdf.factura', compact('venta', 'total'))
            ->setOptions(['isRemoteEnabled' => true]);

        return $pdf->stream("factura_$id.pdf");
    }
}
