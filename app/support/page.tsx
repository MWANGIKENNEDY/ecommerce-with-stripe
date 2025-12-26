"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Clock, MapPin, Send } from "lucide-react";

export default function SupportPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        orderNumber: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Support request:", formData);
        alert("Thank you for contacting us! We'll get back to you within 24 hours.");
        setFormData({
            name: "",
            email: "",
            orderNumber: "",
            subject: "",
            message: ""
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Support</h1>
                    <p className="text-lg text-gray-600">
                        We're here to help! Get in touch with our support team.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Contact Methods */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-indigo-600 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Email Support</p>
                                        <p className="text-gray-600">support@trendlama.com</p>
                                        <p className="text-sm text-gray-500">Response within 24 hours</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-indigo-600 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Phone Support</p>
                                        <p className="text-gray-600">1-800-TRENDLAMA</p>
                                        <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MessageCircle className="w-5 h-5 text-indigo-600 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Live Chat</p>
                                        <p className="text-gray-600">Available on our website</p>
                                        <p className="text-sm text-gray-500">Mon-Fri 9AM-9PM EST</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-indigo-600" />
                                Business Hours
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Monday - Friday</span>
                                    <span className="text-gray-900">9:00 AM - 6:00 PM EST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Saturday</span>
                                    <span className="text-gray-900">10:00 AM - 4:00 PM EST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sunday</span>
                                    <span className="text-gray-900">Closed</span>
                                </div>
                            </div>
                        </div>

                        {/* Office Location */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                                Office Location
                            </h3>
                            <div className="text-sm text-gray-600">
                                <p>TrendLama Headquarters</p>
                                <p>123 Fashion Avenue</p>
                                <p>New York, NY 10001</p>
                                <p>United States</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                            Order Number (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="orderNumber"
                                            name="orderNumber"
                                            value={formData.orderNumber}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="ORD-123456"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="order-inquiry">Order Inquiry</option>
                                            <option value="shipping">Shipping & Delivery</option>
                                            <option value="returns">Returns & Exchanges</option>
                                            <option value="product-question">Product Question</option>
                                            <option value="payment">Payment Issue</option>
                                            <option value="technical">Technical Support</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Please describe your question or issue in detail..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">How can I track my order?</h3>
                            <p className="text-gray-600">
                                You can track your order using our <a href="/track-order" className="text-indigo-600 hover:text-indigo-700">order tracking page</a>. 
                                Simply enter your order number to see real-time updates on your shipment status.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">What is your return policy?</h3>
                            <p className="text-gray-600">
                                We offer a 30-day return policy for all items in original condition. 
                                Returns are free and easy - just contact our support team to get started.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">How long does shipping take?</h3>
                            <p className="text-gray-600">
                                Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. 
                                Free shipping is available on orders over $50.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I change or cancel my order?</h3>
                            <p className="text-gray-600">
                                Orders can be modified or cancelled within 1 hour of placement. 
                                After that, please contact our support team and we'll do our best to help.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}