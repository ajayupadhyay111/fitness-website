import { Dumbbell } from 'lucide-react';

interface LoadingPageProps {
    onLoadComplete?: () => void;
    duration?: number;
}

const LoadingPage = ({ onLoadComplete, duration = 2000 }: LoadingPageProps) => {
    // Auto complete after duration
    if (onLoadComplete && duration) {
        setTimeout(onLoadComplete, duration);
    }

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            {/* Center Animation Only */}
            <div className="relative">
                {/* Outer Spinning Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                </div>

                {/* Middle Spinning Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="w-24 h-24 border-4 border-gray-200 border-b-accent rounded-full animate-spin"
                        style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
                    ></div>
                </div>

                {/* Center Logo with Pulse */}
                <div className="relative flex items-center justify-center w-32 h-32">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-xl animate-pulse">
                        <Dumbbell className="w-10 h-10 text-white" />
                    </div>
                </div>

                {/* Brand Name Below */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <h2 className="text-2xl font-bold text-secondary">
                        Fit<span className="text-primary">Life</span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;