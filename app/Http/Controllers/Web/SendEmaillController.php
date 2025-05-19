<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Mail\ContactoProveedorMail;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class SendEmaillController extends Controller
{
    //
    
    public function sendEmail(Request $request)
    {
    try {
            $request->validate([
                'to' => 'required|email',
                'subject' => 'required|string',
                'message' => 'required|string',
            ]);

            Mail::raw($request->message, function ($message) use ($request) {
                $message->to('testgiddonpk@gmail.com')
                        ->subject($request->subject);
            });

            return redirect()->back()->with('success', 'Correo enviado con éxito');
        } catch (\Exception $e) {
            Log::error('Error enviando correo: ' . $e->getMessage());
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
        
}
