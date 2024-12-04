import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function AddEvent({ event = null }) {
    // Initialize form data using Inertia's useForm
    const { data, setData, post, put, processing, errors ,clearErrors} = useForm({
        title: event?.title || '',
        description: event?.description || '',
        event_date: event?.event_date ? event.event_date.split(' ')[0] : '', // Extract date part
        event_time: event?.event_date ? event.event_date.split(' ')[1] : '', // Extract time part
        location: event?.location || '',
        status: event?.status || 'Pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Combine date and time into one datetime string before submitting
        const fullEventDate = `${data.event_date} ${data.event_time}`;

        if (event) {
            // Update existing event
            put(route('events.update', event.id), { data: { ...data, event_date: fullEventDate } });
        } else {
            // Create new event
            post(route('events.store'), { data: { ...data, event_date: fullEventDate } });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {event ? 'Update Event' : 'Create Event'}
                </h2>
            }
        >
            <Head title={event ? 'Update Event' : 'Create Event'} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            {/* Title Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    onFocus={() => clearErrors('title')}
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.title && (
                                    <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Description Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    onFocus={() => clearErrors('description')}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="5"
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.description && (
                                    <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Event Date Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="event_date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Event Date
                                </label>
                                <input
                                    type="date"
                                    onFocus={() => clearErrors('event_date')}
                                    id="event_date"
                                    value={data.event_date}
                                    onChange={(e) => setData('event_date', e.target.value)}
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.event_date && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.event_date}
                                    </p>
                                )}
                            </div>

                            {/* Event Time Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="event_time"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Event Time
                                </label>
                                <input
                                    type="time"
                                    id="event_time"
                                    onFocus={() => clearErrors('event_time')}
                                    value={data.event_time}
                                    onChange={(e) => setData('event_time', e.target.value)}
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.event_time && (
                                    <p className="mt-2 text-sm text-red-600">{errors.event_time}</p>
                                )}
                            </div>

                            {/* Location Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    onFocus={() => clearErrors('location')}
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.location && (
                                    <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                                )}
                            </div>

                            {/* Status Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Status
                                </label>
                                <select
                                    id="status"
                                    onFocus={() => clearErrors('status')}
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                {errors.status && (
                                    <p className="mt-2 text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                >
                                    {event ? 'Update Event' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
