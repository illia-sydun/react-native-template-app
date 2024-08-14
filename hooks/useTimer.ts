import { useEffect, useState } from 'react';

const useTimer = (initialTime: number) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const resetTimer = () => {
        setTimeLeft(initialTime);
    };

    return { timeLeft, resetTimer };
};

export default useTimer;
