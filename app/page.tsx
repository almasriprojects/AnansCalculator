import Calculator from '@/app/components/Calculator';
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  return (
    <main className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-white w-full h-full">
      <div className="flex flex-col justify-between h-full p-4 sm:p-6">
        <div className="flex-grow bg-white rounded shadow-md w-full max-w-sm mx-auto">
          <Calculator />
          <Analytics />
        </div>
        <div className="h-24"></div>
      </div>
    </main>
  );
}
