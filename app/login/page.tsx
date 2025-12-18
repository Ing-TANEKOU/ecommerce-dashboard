import { signIn } from '@/auth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Connexion Dashboard
        </h1>
        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/dashboard' });
          }}
        >
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Se connecter avec Google
          </button>
        </form>
        <p className="text-sm text-slate-600 mt-4 text-center">
          Mode mock: utiliser n'importe quel compte Google
        </p>
      </div>
    </div>
  );
}