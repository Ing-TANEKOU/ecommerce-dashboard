import { auth, signOut } from '@/auth';
import { LogOut } from 'lucide-react';

export async function UserMenu() {
  const session = await auth();
  
  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-700">
        {session.user.email}
      </span>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      >
        <button
          type="submit"
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </form>
    </div>
  );
}