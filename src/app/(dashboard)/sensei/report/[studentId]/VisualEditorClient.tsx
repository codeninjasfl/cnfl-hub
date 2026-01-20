'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SessionCardEditor from '@/components/SessionCardEditor'
import { createClient } from '@/utils/supabase/client'

interface VisualEditorClientProps {
    student: {
        id: string
        name: string
        belt_color: string
    }
    senseiName: string
}

export default function VisualEditorClient({ student, senseiName }: VisualEditorClientProps) {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSave = async (imageDataUrl: string) => {
        setSaving(true)
        setError(null)

        try {
            const supabase = createClient()

            // Get current user
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')

            // Convert data URL to blob
            const response = await fetch(imageDataUrl)
            const blob = await response.blob()

            // Generate unique filename
            const filename = `session-card-${student.id}-${Date.now()}.png`

            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('session-cards')
                .upload(filename, blob, {
                    contentType: 'image/png',
                    cacheControl: '3600'
                })

            if (uploadError) {
                // If bucket doesn't exist, we'll store the data URL directly
                console.warn('Storage upload failed, using data URL:', uploadError)
            }

            // Get public URL or use data URL as fallback
            let cardImageUrl = imageDataUrl
            if (uploadData) {
                const { data: urlData } = supabase.storage
                    .from('session-cards')
                    .getPublicUrl(filename)
                cardImageUrl = urlData.publicUrl
            }

            // Create session card record
            const { error: insertError } = await supabase
                .from('session_cards')
                .insert({
                    student_id: student.id,
                    sensei_id: user.id,
                    date: new Date().toISOString(),
                    activities_completed: ['Visual Session Card'],
                    notes: 'Visual session card submitted',
                    next_goals: '',
                    card_image_url: cardImageUrl
                })

            if (insertError) throw insertError

            // Show success state
            setSaving(false)
            setSaved(true)

            // Wait a moment for user to see success, then redirect
            setTimeout(() => {
                router.push('/sensei')
                router.refresh()
            }, 1500)

        } catch (err: any) {
            console.error('Save error:', err)
            setError(err.message || 'Failed to save session card')
            setSaving(false)
        }
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6 animate-in fade-in">
            {/* Success Overlay */}
            {saved && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="flex flex-col items-center gap-4 p-10 bg-white rounded-3xl shadow-2xl animate-in zoom-in-95">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-green-600 animate-in zoom-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-gray-900">Session Card Saved!</h2>
                            <p className="text-gray-600 mt-1">Redirecting you back...</p>
                        </div>
                        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full animate-pulse"
                                style={{ width: '100%', animation: 'grow 1.5s ease-out forwards' }}
                            />
                        </div>
                    </div>
                    <style jsx>{`
                        @keyframes grow {
                            from { width: 0%; }
                            to { width: 100%; }
                        }
                    `}</style>
                </div>
            )}

            {/* Saving Overlay */}
            {saving && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="flex flex-col items-center gap-4 p-10 bg-white rounded-3xl shadow-2xl animate-in zoom-in-95">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-gray-900">Saving Session Card</h2>
                            <p className="text-gray-600 mt-1">Please wait...</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="dashboard-header animate-in slide-in-up delay-100">
                <h1 className="text-2xl font-bold uppercase">Visual Session Card</h1>
                <p>Fill out the card for {student.name}</p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <SessionCardEditor
                beltColor={student.belt_color}
                studentName={student.name}
                senseiName={senseiName}
                onSave={handleSave}
            />
        </div>
    )
}

