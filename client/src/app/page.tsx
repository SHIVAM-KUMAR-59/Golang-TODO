'use client'

import type React from 'react'

import { useState } from 'react'
import {
  X,
  Plus,
  Code,
  Database,
  Zap,
  Globe,
  Layers,
  Wrench,
} from 'lucide-react'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate user creation
    console.log('Creating user:', formData)
    alert(`Welcome ${formData.name}! Your account has been created.`)
    setFormData({ name: '', email: '', username: '' })
    setIsModalOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-900/30 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-amber-800/50">
            <span>⚠️</span>
            Yes, another TODO app
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to <span className="text-blue-400">TODO</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            What started as the most basic thing anyone can build became my
            journey into
            <span className="font-semibold text-blue-300">
              {' '}
              production-ready Go architecture
            </span>
            ,
            <span className="font-semibold text-purple-300"> gRPC mastery</span>
            , and
            <span className="font-semibold text-green-300">
              {' '}
              modern full-stack development
            </span>
            .
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
          >
            <Plus className="w-5 h-5" />
            Get Started
          </button>
        </div>

        {/* Why This Project Matters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            🎯 Why This Simple TODO App Matters
          </h2>

          <div className="text-center mb-8">
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Yes, it&apos;s just{' '}
              <span className="text-blue-400 font-semibold">Create</span>,
              <span className="text-green-400 font-semibold"> Read</span>,
              <span className="text-yellow-400 font-semibold"> Update</span>,
              and
              <span className="text-red-400 font-semibold"> Delete</span> todos.
              But behind this simplicity lies a deep dive into{' '}
              <span className="text-purple-400 font-semibold">
                industrial-grade concepts{' '}
              </span>
              that power real-world applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Learning Over Complexity
                  </h3>
                  <p className="text-slate-300">
                    Focused on mastering foundational concepts rather than
                    building feature-heavy applications
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
                  <Layers className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Industrial Patterns
                  </h3>
                  <p className="text-slate-300">
                    Applied enterprise-level architectural patterns to
                    understand how they work in practice
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg border border-purple-500/30">
                  <Database className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Real-World Tooling
                  </h3>
                  <p className="text-slate-300">
                    Hands-on experience with tools and technologies used in
                    production environments
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500/20 p-3 rounded-lg border border-orange-500/30">
                  <Wrench className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Concept Familiarization
                  </h3>
                  <p className="text-slate-300">
                    Deep understanding of how modern backend and frontend
                    technologies integrate
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg border border-cyan-500/30">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Foundation Building
                  </h3>
                  <p className="text-slate-300">
                    Solid groundwork for tackling more complex projects with
                    confidence
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-pink-500/20 p-3 rounded-lg border border-pink-500/30">
                  <Globe className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Industry Standards
                  </h3>
                  <p className="text-slate-300">
                    Exposure to best practices and conventions used in
                    professional development
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/30 rounded-xl">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-3">
                The Learning Philosophy
              </h4>
              <p className="text-slate-300 leading-relaxed">
                &quot;Sometimes the most valuable projects aren&apos;t the most
                complex ones. They&apos;re the ones that teach you{' '}
                <span className="text-blue-400 font-semibold">
                  how to think
                </span>{' '}
                like a professional developer,
                <span className="text-green-400 font-semibold">
                  how to structure
                </span>{' '}
                your code, and{' '}
                <span className="text-purple-400 font-semibold">
                  how to use
                </span>{' '}
                the right tools for the job.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Technology Deep Dive */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Backend */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 text-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold">Backend Powerhouse (Go)</h3>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-400 pl-4 bg-blue-500/10 py-2 rounded-r">
                <h4 className="font-semibold text-blue-400 mb-1">
                  🔌 gRPC/ConnectRPC
                </h4>
                <p className="text-slate-300 text-sm">
                  Learned how modern APIs can be both performant and
                  developer-friendly
                </p>
              </div>

              <div className="border-l-4 border-green-400 pl-4 bg-green-500/10 py-2 rounded-r">
                <h4 className="font-semibold text-green-400 mb-1">
                  📋 Protobuf
                </h4>
                <p className="text-slate-300 text-sm">
                  Mastered schema-first development and cross-language
                  compatibility
                </p>
              </div>

              <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-500/10 py-2 rounded-r">
                <h4 className="font-semibold text-yellow-400 mb-1">🗃️ SQLC</h4>
                <p className="text-slate-300 text-sm">
                  Experienced the power of compile-time SQL validation and type
                  generation
                </p>
              </div>

              <div className="border-l-4 border-purple-400 pl-4 bg-purple-500/10 py-2 rounded-r">
                <h4 className="font-semibold text-purple-400 mb-1">🔄 Goose</h4>
                <p className="text-slate-300 text-sm">
                  Implemented database versioning and migration strategies
                </p>
              </div>

              <div className="border-l-4 border-red-400 pl-4 bg-red-500/10 py-2 rounded-r">
                <h4 className="font-semibold text-red-400 mb-1">
                  🏗️ Clean Architecture
                </h4>
                <p className="text-slate-300 text-sm">
                  Applied domain-driven design principles for maintainable code
                </p>
              </div>
            </div>
          </div>

          {/* Frontend */}
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-700/50 text-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-cyan-300" />
              <h3 className="text-2xl font-bold">
                Frontend Innovation (Next.js)
              </h3>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-cyan-300 pl-4 bg-cyan-500/10 py-2 rounded-r">
                <h4 className="font-semibold text-cyan-300 mb-1">
                  🌐 ConnectRPC Integration
                </h4>
                <p className="text-blue-100 text-sm">
                  Bridged the gap between gRPC services and modern web
                  applications
                </p>
              </div>

              <div className="border-l-4 border-pink-300 pl-4 bg-pink-500/10 py-2 rounded-r">
                <h4 className="font-semibold text-pink-300 mb-1">
                  ⚡ Type-Safe APIs
                </h4>
                <p className="text-blue-100 text-sm">
                  Leveraged generated TypeScript clients for seamless
                  frontend-backend communication
                </p>
              </div>

              <div className="border-l-4 border-yellow-300 pl-4 bg-yellow-500/10 py-2 rounded-r">
                <h4 className="font-semibold text-yellow-300 mb-1">
                  🔄 Full-Stack Integration
                </h4>
                <p className="text-blue-100 text-sm">
                  Mastered end-to-end type safety from Protobuf schemas to React
                  components with generated TypeScript clients
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 border border-blue-500/30 text-white rounded-2xl p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to explore the architecture?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Dive into a TODO app that&apos;s anything but basic
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl cursor-pointer"
          >
            Start Your Journey
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                Create Your Account
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
                  placeholder="Choose a username"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/25 cursor-pointer"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
