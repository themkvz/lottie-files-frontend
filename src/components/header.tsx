import lottieLogo from '@/assets/lottie-logo.svg'

export function Header () {
  return (
    <header className='sticky z-10 top-0 h-header backdrop-blur bg-white supports-[backdrop-filter]:bg-white/90'>
      <div className="container py-6 h-full flex items-center">
        <img src={lottieLogo} className='h-8' alt='logo' />
      </div>
    </header>
  )
}
