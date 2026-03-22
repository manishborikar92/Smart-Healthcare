import { Target, Cpu, Shield, Users, Github, Mail } from 'lucide-react'

export const metadata = {
  title: 'About',
  description:
    'Learn about Smart Healthcare AI — an advanced medical imaging platform that uses ResNet-50 v2 to assist in skin condition diagnosis.',
}

const pillars = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To make accurate skin condition diagnosis more accessible and efficient through AI-powered technology, helping bridge the gap between patients and dermatological care.',
  },
  {
    icon: Cpu,
    title: 'Technology',
    description:
      'Built using a custom-trained ResNet-50 v2 deep learning model hosted on Hugging Face Spaces, delivering real-time classification through modern web technologies.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Your images are processed securely and never stored. Analysis happens in real-time through encrypted connections to our AI model.',
  },
  {
    icon: Users,
    title: 'For Everyone',
    description:
      'Designed with accessibility in mind — our platform is free, open-source, and built to serve patients, students, and healthcare professionals alike.',
  },
]

const team = [
  {
    name: 'Manish Borikar',
    role: 'Full-Stack Developer',
    github: 'https://github.com/manishborikar92',
    email: 'manishborikar@proton.me',
  },
  {
    name: 'Prankita Potbhare',
    role: 'ML Engineer',
    github: 'https://github.com/prankitapotbhare',
    email: 'prankitapotbhare@proton.me',
  },
]

const techStack = [
  { name: 'Next.js 16', category: 'Framework' },
  { name: 'React 19', category: 'UI Library' },
  { name: 'Tailwind CSS v4', category: 'Styling' },
  { name: 'ResNet-50 v2', category: 'AI Model' },
  { name: 'TensorFlow 2.0', category: 'ML Framework' },
  { name: 'Hugging Face', category: 'Model Hosting' },
  { name: 'Gradio Client', category: 'API Layer' },
  { name: 'Vercel', category: 'Deployment' },
]

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Page Header */}
        <section className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-text-primary">About </span>
            <span className="text-gradient bg-gradient-to-r from-brand-400 to-cyan-400">
              Smart Healthcare AI
            </span>
          </h1>
          <p className="text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            An advanced medical imaging platform that leverages artificial intelligence
            to assist in skin condition diagnosis, built for education and accessibility.
          </p>
        </section>

        {/* Pillars Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12" aria-label="Core values">
          {pillars.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="glass rounded-2xl p-5 sm:p-6 hover:bg-bg-glass-hover hover:border-brand-400/20 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400/15 to-cyan-500/15 flex items-center justify-center mb-4">
                <Icon size={20} className="text-brand-400" aria-hidden="true" />
              </div>
              <h2 className="text-base font-semibold text-text-primary mb-2">{title}</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
            </div>
          ))}
        </section>

        {/* How It Works */}
        <section className="mb-12 animate-fade-in-up delay-300">
          <h2 className="text-xl font-bold text-text-primary mb-6 text-center">How It Works</h2>
          <div className="glass rounded-2xl p-5 sm:p-6 space-y-4">
            {[
              { step: '1', title: 'Upload', desc: 'Drag and drop or click to upload a skin condition image.' },
              { step: '2', title: 'Analyze', desc: 'The image is sent to our ResNet-50 v2 model on Hugging Face for classification.' },
              { step: '3', title: 'Results', desc: 'Receive instant classification with confidence score and recommended actions.' },
            ].map(({ step, title, desc }, index) => (
              <div key={step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-brand-400/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-brand-400">{step}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
                  <p className="text-sm text-text-secondary">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12 animate-fade-in-up delay-400">
          <h2 className="text-xl font-bold text-text-primary mb-6 text-center">Technology Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {techStack.map(({ name, category }) => (
              <div
                key={name}
                className="glass rounded-xl p-3 text-center hover:bg-bg-glass-hover transition-colors"
              >
                <p className="text-sm font-semibold text-text-primary">{name}</p>
                <p className="text-xs text-text-tertiary">{category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="animate-fade-in-up delay-500">
          <h2 className="text-xl font-bold text-text-primary mb-6 text-center">The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {team.map(({ name, role, github, email }) => (
              <div
                key={name}
                className="glass rounded-2xl p-5 sm:p-6 hover:bg-bg-glass-hover transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-cyan-500 flex items-center justify-center">
                    <span className="text-sm font-bold text-surface-950">
                      {name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{name}</p>
                    <p className="text-xs text-text-tertiary">{role}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-surface-400 hover:text-brand-400 transition-colors"
                  >
                    <Github size={12} aria-hidden="true" />
                    <span>GitHub Profile</span>
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-xs text-surface-400 hover:text-brand-400 transition-colors"
                  >
                    <Mail size={12} aria-hidden="true" />
                    <span>{email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
