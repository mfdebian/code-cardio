import Questions from './Questions';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4 sm:p-8'>
      <main className='w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-[800px] relative flex flex-col'>
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-rose-500/10 pointer-events-none' />
        <div className='p-6 flex-1 flex flex-col'>
          <header className='mb-8 flex items-center justify-between'>
            <h1 className='text-3xl font-black tracking-tighter bg-gradient-to-r from-indigo-400 to-rose-400 bg-clip-text text-transparent'>
              Code Cardio
            </h1>
            <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 opacity-80' />
          </header>
          <Questions />
        </div>
      </main>
    </div>
  );
}
