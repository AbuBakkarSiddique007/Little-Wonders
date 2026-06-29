"use client"

import { useState } from "react";
import Swal from "sweetalert2";
import { 
    BsGeoAlt, 
    BsTelephone, 
    BsEnvelope, 
    BsClock, 
    BsSend, 
    BsCheckCircle 
} from "react-icons/bs";

export default function ContactPage() {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const subject = form.subject.value;
        const message = form.message.value;

        setTimeout(() => {
            setSubmitting(false);
            form.reset();

            Swal.fire({
                title: "Message Sent Successfully!",
                html: `
                    <div class="text-left space-y-2 mt-4 text-sm text-base-content/80">
                        <p>Thank you <strong>${name}</strong> for reaching out to us!</p>
                        <p>We have received your inquiry regarding <strong>"${subject}"</strong>.</p>
                        <p>Our support team will get back to you at <strong>${email}</strong> within 24 hours.</p>
                    </div>
                `,
                icon: "success",
                confirmButtonText: "Awesome",
                confirmButtonColor: "oklch(64% 0.15 210)", 
                customClass: {
                    popup: "rounded-3xl border border-base-200"
                }
            });
        }, 1500);
    };

    return (
        <div className="py-10 px-4 max-w-6xl mx-auto min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
                    Get in <span className="text-primary">Touch</span>
                </h1>
                <p className="text-base-content/60 max-w-2xl mx-auto text-base md:text-lg">
                    Have questions about our educational toys, shipping, or orders? We are here to help you! Drop us a message.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-base-200/50 p-6 md:p-8 rounded-3xl border border-base-300/40 space-y-8">
                        <h2 className="text-2xl font-bold text-base-content">Contact Information</h2>

                        <div className="flex gap-4 items-start">
                            <span className="p-3 bg-primary/10 text-primary rounded-2xl text-xl shrink-0">
                                <BsGeoAlt />
                            </span>
                            <div>
                                <h3 className="font-semibold text-base-content">Our Store</h3>
                                <p className="text-sm text-base-content/70 mt-1 leading-relaxed">
                                    House 12, Road 4, Dhanmondi,<br />
                                    Dhaka - 1209, Bangladesh
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-4 items-start">
                            <span className="p-3 bg-secondary/10 text-secondary rounded-2xl text-xl shrink-0">
                                <BsTelephone />
                            </span>
                            <div>
                                <h3 className="font-semibold text-base-content">Call Us</h3>
                                <p className="text-sm text-base-content/70 mt-1 space-y-1">
                                    <span className="block">+880 1712-345678</span>
                                    <span className="block">+880 1987-654321</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <span className="p-3 bg-accent/20 text-neutral rounded-2xl text-xl shrink-0">
                                <BsEnvelope />
                            </span>
                            <div>
                                <h3 className="font-semibold text-base-content">Email Us</h3>
                                <p className="text-sm text-base-content/70 mt-1 space-y-1">
                                    <span className="block">support@littlewonders.com</span>
                                    <span className="block">sales@littlewonders.com</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <span className="p-3 bg-success/10 text-success-content/80 rounded-2xl text-xl shrink-0">
                                <BsClock />
                            </span>
                            <div>
                                <h3 className="font-semibold text-base-content">Office Hours</h3>
                                <p className="text-sm text-base-content/70 mt-1">
                                    Saturday - Thursday: 10:00 AM - 7:00 PM<br />
                                    Friday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <div className="bg-base-100 p-6 md:p-8 rounded-3xl border border-base-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-base-content mb-6">Send Us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label label-text font-medium">Your Name <span className="text-error">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Enter your name"
                                        className="input input-bordered w-full rounded-2xl bg-base-200/20"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label label-text font-medium">Your Email <span className="text-error">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full rounded-2xl bg-base-200/20"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label label-text font-medium">Subject <span className="text-error">*</span></label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    placeholder="Inquiry subject"
                                    className="input input-bordered w-full rounded-2xl bg-base-200/20"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label label-text font-medium">Message <span className="text-error">*</span></label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Write your message here..."
                                    className="textarea textarea-bordered w-full rounded-2xl resize-none bg-base-200/20"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn btn-primary w-full rounded-2xl text-base font-semibold gap-2 mt-4"
                            >
                                {submitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span> Sending...
                                    </>
                                ) : (
                                    <>
                                        <BsSend /> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
