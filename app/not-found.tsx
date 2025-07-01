export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-300">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Sorry, we couldn't find the page you're looking for. It
                        might have been moved, deleted, or you entered the wrong
                        URL.
                    </p>
                </div>
                <a
                    href="/"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Go back home
                </a>
            </div>
        </div>
    );
}
