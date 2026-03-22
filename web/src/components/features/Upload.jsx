'use client'

import { useState, useEffect, useRef } from 'react'
import { Client } from '@gradio/client'
import {
  Upload as UploadIcon,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  RefreshCw,
  Trash2,
  Activity,
} from 'lucide-react'
import Results from './Results'

export default function Upload() {
  const [model, setModel] = useState(null)
  const [modelLoading, setModelLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)
  const errorRef = useRef(null)

  // Connect to the HuggingFace Gradio space on mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        const client = await Client.connect(
          'theodinproject/skin_cancer_model_resnet50v2',
        )
        setModel(client)
      } catch {
        setError('Failed to connect to the AI model. Please refresh the page.')
      } finally {
        setModelLoading(false)
      }
    }
    loadModel()
  }, [])

  // Clean up object URL on unmount or image change
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage)
      }
    }
  }, [previewImage])

  // Focus error message when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus()
    }
  }, [error])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setPreviewImage(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    } else if (file) {
      setError('Please upload a valid image file (PNG, JPG, or WebP).')
    }
  }

  const handleClear = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage)
    }
    setSelectedFile(null)
    setPreviewImage(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handlePredict = async () => {
    if (!model) {
      setError('AI model is still loading. Please wait a moment.')
      return
    }

    if (!selectedFile) {
      setError('Please upload an image first.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const predictionResult = await model.predict('/predict', {
        image: selectedFile,
      })
      if (
        predictionResult?.data?.[0]?.Disease &&
        predictionResult?.data?.[0]?.Accuracy
      ) {
        setResult({
          disease: predictionResult.data[0].Disease,
          accuracy: predictionResult.data[0].Accuracy,
        })
      } else {
        setError('Invalid response from the AI model. Please try again.')
      }
    } catch {
      setError('Analysis failed. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Model Status Indicator */}
      {modelLoading && (
        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-info-500/10 border border-info-500/20 text-info-400 text-sm">
          <Loader2 size={16} className="animate-spin-slow" aria-hidden="true" />
          <span>Connecting to AI model…</span>
        </div>
      )}

      {/* Drop Zone */}
      <div
        className={`
          relative group rounded-2xl
          transition-all duration-300 ease-out
          ${previewImage ? 'p-5 sm:p-6' : 'p-8 sm:p-12 cursor-pointer'}
          ${
            dragActive
              ? 'bg-brand-400/10 border-2 border-brand-400/50 shadow-glow scale-[1.01]'
              : 'glass border border-border-default hover:border-brand-400/30 hover:bg-bg-glass-hover'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !previewImage && fileInputRef.current?.click()}
        role={!previewImage ? 'button' : undefined}
        tabIndex={!previewImage ? 0 : undefined}
        aria-label={!previewImage ? 'Upload image for analysis' : undefined}
        onKeyDown={(e) => {
          if (!previewImage && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            fileInputRef.current?.click()
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="file-upload"
          aria-label="Choose image file"
        />

        {!previewImage ? (
          /* ── Empty State: Upload Prompt ── */
          <div className="text-center">
            <div
              className={`
                w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center
                transition-all duration-300
                ${
                  dragActive
                    ? 'bg-brand-400/20 scale-110'
                    : 'bg-gradient-to-br from-brand-400/15 to-cyan-500/15 group-hover:from-brand-400/25 group-hover:to-cyan-500/25'
                }
              `}
            >
              <UploadIcon
                size={28}
                className={`transition-colors duration-300 ${
                  dragActive
                    ? 'text-brand-400'
                    : 'text-brand-400/70 group-hover:text-brand-400'
                }`}
                aria-hidden="true"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-text-primary">
              Upload Image for Analysis
            </h2>
            <p className="text-sm text-text-secondary max-w-sm mx-auto">
              Drag and drop a skin condition image here, or{' '}
              <span className="text-brand-400 font-medium">click to browse</span>
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-tertiary">
              <ImageIcon size={12} aria-hidden="true" />
              <span>Supports PNG, JPG, and WebP</span>
            </div>
          </div>
        ) : (
          /* ── Preview State: Image + Actions ── */
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-surface-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage}
                alt="Preview of uploaded skin condition image"
                className="w-full h-64 sm:h-72 object-contain"
              />

              {/* Image Overlay Actions */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current?.click()
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-900/80 backdrop-blur-sm text-xs text-text-primary hover:bg-surface-800 transition-colors border border-border-default"
                  aria-label="Replace image"
                >
                  <RefreshCw size={12} aria-hidden="true" />
                  Replace
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClear()
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-900/80 backdrop-blur-sm text-xs text-danger-400 hover:bg-danger-500/20 transition-colors border border-border-default"
                  aria-label="Remove image"
                >
                  <Trash2 size={12} aria-hidden="true" />
                  Remove
                </button>
              </div>
            </div>

            {/* File Info */}
            <div className="flex items-center justify-between px-1">
              <span className="text-sm text-text-secondary truncate">
                {selectedFile?.name}
              </span>
              <span className="text-xs text-text-tertiary flex-shrink-0 ml-3">
                {selectedFile && (selectedFile.size / 1024).toFixed(1)} KB
              </span>
            </div>

            {/* Analyze Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handlePredict()
              }}
              disabled={loading || !model}
              className={`
                w-full py-3.5 px-6 rounded-xl font-semibold text-sm
                transition-all duration-300 flex items-center justify-center gap-2
                ${
                  loading || !model
                    ? 'bg-surface-700 text-surface-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-brand-400 to-cyan-500 text-surface-950 hover:from-brand-500 hover:to-cyan-600 hover:shadow-glow active:scale-[0.98]'
                }
              `}
              id="analyze-button"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin-slow" aria-hidden="true" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Activity size={18} aria-hidden="true" />
                  Analyze Image
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div
          ref={errorRef}
          className="flex items-start gap-3 p-4 rounded-xl bg-danger-500/10 border border-danger-500/20 animate-scale-in"
          role="alert"
          tabIndex={-1}
          aria-live="assertive"
        >
          <AlertCircle
            size={18}
            className="text-danger-400 flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="flex-1 text-sm text-danger-400">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-danger-400/60 hover:text-danger-400 transition-colors flex-shrink-0"
            aria-label="Dismiss error"
          >
            <span className="text-lg leading-none">&times;</span>
          </button>
        </div>
      )}

      {/* Results */}
      {result && <Results result={result} />}
    </div>
  )
}
