export function Footer () {
  return (
    <footer className='h-32 bg-muted'>
      <div className='container mx-auto flex justify-between items-center h-full'>
        <p className='text-sm text-muted-foreground'>
          themkvz © {new Date().getFullYear()}
        </p>

        <p className='text-sm text-muted-foreground'>
          Made with ❤️ for{' '}
          <a
            href='https://lottiefiles.com'
            rel='nofollow'
            target='_blank'
            className='text-primary hover:text-mint'
          >
            Lottie
          </a>
        </p>
      </div>
    </footer>
  )
}
