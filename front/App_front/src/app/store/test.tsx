import { useStore } from '@/app/store/useStore';

export function TestComponent() {
    const increment = useStore((state) => state.increment);

    return (
        <button onClick={increment}>
            +1
        </button>
    )
}
