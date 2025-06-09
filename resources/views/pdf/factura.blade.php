<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Factura #{{ $venta->id }}</title>
    <style>
        body {
            background-color: #0f172a;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            color: #e2e8f0;
        }
        .pdf-container {
            max-width: 700px;
            margin: 40px auto;
            background-color: #1e293b;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .header {
            background-color: #0f172a;
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid #334155;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            color: #38bdf8;
        }
        .header p {
            margin: 4px 0 0;
            color: #94a3b8;
            font-size: 14px;
        }
        .body {
            padding: 30px;
            font-size: 15px;
            line-height: 1.6;
        }
        .body p {
            margin-bottom: 10px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
            font-size: 14px;
        }
        .table th, .table td {
            padding: 10px;
            border: 1px solid #334155;
            text-align: center;
        }
        .table th {
            background-color: #334155;
            color: #f1f5f9;
        }
        .table td {
            background-color: #1e293b;
            color: #e2e8f0;
        }
        .total {
            text-align: right;
            margin-top: 20px;
            font-size: 16px;
            font-weight: bold;
        }
        .footer {
            background-color: #0f172a;
            padding: 20px 30px;
            font-size: 12px;
            color: #64748b;
            text-align: center;
            border-top: 1px solid #334155;
        }
    </style>
</head>
<body>
    <div class="pdf-container">
        <div class="header">
            <h1>Factura #{{ $venta->id }}</h1>
            <p>Fecha de venta: {{ $venta->fecha_venta }}</p>
        </div>

        <div class="body">
            <p><strong>Vendedor:</strong> {{ $venta->user->name ?? 'N/A' }}</p>
            <p><strong>Cliente:</strong> {{ $venta->comprador->nombre ?? 'N/A' }}</p>

            <table class="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($venta->detalleVentas as $detalle)
                        <tr>
                            <td>{{ $detalle->nombre }}</td>
                            <td>{{ $detalle->cantidad }}</td>
                            <td>{{ number_format($detalle->precio_unitario, 2) }} €</td>
                            <td>{{ number_format($detalle->precio_unitario * $detalle->cantidad, 2) }} €</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <p class="total">
                Total: {{ number_format($total, 2) }} €
            </p>
        </div>

        <div class="footer">
            © {{ date('Y') }} Inventar.io. Todos los derechos reservados.
        </div>
    </div>
</body>
</html>
