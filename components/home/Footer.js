import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-app px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-app text-lg font-bold">M</span>
              </div>
              <span className="text-xl font-semibold text-primary">MiniDesk</span>
            </Link>
            <p className="text-app/60 text-sm leading-relaxed">
              Your calm work companion. Track your day without the pressure.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-app/70 hover:text-primary transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-app/70 hover:text-primary transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-app/70 hover:text-primary transition-colors text-sm">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-app/70 hover:text-primary transition-colors text-sm">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-app/70 hover:text-primary transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-app/70 hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-app/70 hover:text-primary transition-colors text-sm">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="https://github.com/yourusername/minidesk" target="_blank" className="text-app/70 hover:text-primary transition-colors text-sm">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-app/70 hover:text-primary transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-app/70 hover:text-primary transition-colors text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-app/70 hover:text-primary transition-colors text-sm">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-app/70 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-app flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-app/60 text-sm">
            © {currentYear} MiniDesk. Built with care, not pressure.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link 
              href="https://twitter.com/minidesk" 
              target="_blank"
              className="text-app/60 hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link 
              href="https://github.com/yourusername/minidesk" 
              target="_blank"
              className="text-app/60 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link 
              href="https://linkedin.com/company/minidesk" 
              target="_blank"
              className="text-app/60 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}