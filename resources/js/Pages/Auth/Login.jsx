import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import logoGoogle from "../../../images/logoGoogle.png";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onSuccess: (response) => console.log(response),
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="w-full max-w-md mx-auto px-4 sm:px-6"
            >
                {/* Logo - solo visible en móviles y tablets */}
                <div className="flex justify-center mb-4 md:hidden h-12  overflow-hidden">
                    <ApplicationLogo className="w-32 h-auto object-cover text-slate-500" />
                </div>
                
                {/* Google Login */}
                <div className="mt-6 flex justify-center pb-6">
                    <button
                        type="button"
                        onClick={() =>
                            (window.location.href = route("google.redirect"))
                        }
                        className="w-full flex items-center justify-center gap-3 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 border shadow-sm hover:shadow-md transition"
                    >
                        <img
                            src={logoGoogle}
                            alt="Google"
                            className="h-5 w-5"
                        />
                        Iniciar sesión con Google
                    </button>
                </div>

                {/* Email Field */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password Field */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Remember Me */}
                <div className="mt-4 flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                        Recuérdame
                    </span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            ¿Has olvidado tu contraseña?
                        </Link>
                    )}

                    <PrimaryButton
                        className="w-full sm:w-auto"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>
                </div>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
                <Link
                    href={route("register")}
                    className="text-xs text-slate-400 underline hover:text-slate-600"
                >
                    ¿No estás registrado aún?
                </Link>
            </div>
        </GuestLayout>
    );
}
