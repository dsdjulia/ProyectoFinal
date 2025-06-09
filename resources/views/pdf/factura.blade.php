<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Factura #{{ $venta->id }} | Inventar.io</title>
    <style>
        body {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 20px;
            color: #e2e8f0;
            min-height: 100vh;
        }

        .invoice-container {
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
            font-size: 28px;
            font-weight: 700;
            background: linear-gradient(135deg, #38bdf8, #0ea5e9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.5px;
        }
        .header p {
            margin: 4px 0 0;
            color: #94a3b8;
            font-size: 14px;
        }
        .invoice-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
            padding: 20px 0;
            border-bottom: 1px solid #334155;
        }
        .invoice-info-section {
            flex: 1;
        }
        .invoice-info-section h3 {
            color: #38bdf8;
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 16px;
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
            border-radius: 6px;
            overflow: hidden;
        }
        .table th, .table td {
            padding: 12px 15px;
            text-align: left;
        }
        .table th {
            background-color: #334155;
            color: #f1f5f9;
            font-weight: 600;
        }
        .table tr:nth-child(even) td {
            background-color: #283548;
        }
        .table tr:nth-child(odd) td {
            background-color: #1e293b;
        }
        .table td:last-child, .table th:last-child {
            text-align: right;
        }
        .table td:nth-child(2), .table th:nth-child(2) {
            text-align: center;
        }
        .total-section {
            margin-top: 30px;
            border-top: 1px solid #334155;
            padding-top: 20px;
        }
        .total {
            text-align: right;
            font-size: 18px;
            font-weight: bold;
            color: #38bdf8;
        }
        .footer {
            background-color: #0f172a;
            padding: 20px 30px;
            font-size: 12px;
            color: #64748b;
            text-align: center;
            border-top: 1px solid #334155;
        }
        .footer a {
            color: #38bdf8;
            text-decoration: none;
        }
        .thank-you {
            text-align: center;
            margin-top: 30px;
            font-style: italic;
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <h1>Inventar.io</h1>
            <p>Factura #{{ $venta->id }}</p>
        </div>

        <div class="body">
            <div class="invoice-info">
                <div class="invoice-info-section">
                    <h3>Información de Factura</h3>
                    <p><strong>Fecha de emisión:</strong> {{ $venta->fecha_venta }}</p>
                </div>
                <div class="invoice-info-section">
                    <h3>Cliente</h3>
                    <p><strong>Nombre:</strong> {{ $venta->comprador->nombre ?? 'N/A' }}</p>
                    @if(isset($venta->comprador->email))
                    <p><strong>Email:</strong> {{ $venta->comprador->email }}</p>
                    @endif
                </div>
                <div class="invoice-info-section">
                    <h3>Vendedor</h3>
                    <p><strong>Nombre:</strong> {{ $venta->user->name ?? 'N/A' }}</p>
                    @if(isset($venta->user->email))
                    <p><strong>Email:</strong> {{ $venta->user->email }}</p>
                    @endif
                </div>
            </div>

            <h3 style="color: #38bdf8; margin-bottom: 15px;">Detalle de Productos</h3>
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
                            <td>{{ $detalle->producto->nombre }}</td>
                            <td>{{ $detalle->cantidad }}</td>
                            <td>{{ number_format($detalle->precio_unitario, 2) }} €</td>
                            <td>{{ number_format($detalle->precio_unitario * $detalle->cantidad, 2) }} €</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <div class="total-section">
                <p class="total">
                    Total: {{ number_format($total, 2) }} €
                </p>
            </div>

            <p class="thank-you">
                Gracias por confiar en Inventar.io para la gestión de su inventario.
            </p>
        </div>

        <div class="footer">
            © {{ date('Y') }} Inventar.io. Todos los derechos reservados. <br>
            <a href="{{ route('inventario.index', ['id'=>1]) }}">www.inventar.io</a> | 
            Gestión inteligente de inventarios
        </div>
    </div>
</body>
</html>
