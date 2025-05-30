"use client"

import React from 'react';
import { ContactInfo } from '@/app/components/ui/ContactInfo';
import { ContactForm } from '@/app/components/ui/ContactForm';

export const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};
