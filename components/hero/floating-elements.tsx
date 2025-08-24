export default function FloatingElements() {
    return (
        <>
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </>
    );
}
