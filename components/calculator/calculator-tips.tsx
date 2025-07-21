import { Clock, DollarSign, FileText } from "lucide-react";

export function CalculatorTips() {
    return (
        <div className="mt-12 grid md:grid-cols-3 gap-3">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-600 rounded-full p-2">
                        <FileText className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-900">
                        Contract Types
                    </h4>
                </div>

                <p className="text-sm text-blue-800">
                    Limited contracts have specific end dates, while unlimited
                    contracts are open-ended. This affects your gratuity
                    calculation significantly.
                </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-600 rounded-full p-2">
                        <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-green-900">
                        Basic Salary Only
                    </h4>
                </div>
                <p className="text-sm text-green-800">
                    Gratuity is calculated only on your basic salary, not
                    including housing allowance, transport, or other benefits.
                </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-purple-600 rounded-full p-2">
                        <Clock className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-purple-900">
                        Service Years
                    </h4>
                </div>
                <p className="text-sm text-purple-800">
                    First 5 years: 21 days per year. After 5 years: 30 days per
                    year. Maximum cap is 2 years' total salary.
                </p>
            </div>
        </div>
    );
}
