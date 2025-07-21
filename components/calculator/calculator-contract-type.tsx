import { useCalculator } from "@/state/calculator";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Clock, FileText } from "lucide-react";

export function CalculatorContractType() {
    const contractType = useCalculator((state) => state.contractType);
    const setContractType = useCalculator(
        (state) => state.actions.setContractType
    );

    return (
        <div className="space-y-6">
            <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Contract Type
            </Label>

            <RadioGroup
                value={contractType}
                onValueChange={setContractType}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-400  transition-all duration-300 bg-white/70 backdrop-blur-sm has-[button[data-state=checked]]:border-blue-400">
                        <RadioGroupItem
                            value="limited"
                            id="limited"
                            className="mt-2 w-full h-full border-2 border-blue-500 absolute inset-0 opacity-0 cursor-pointer"
                        />

                        <div className="flex-1">
                            <Label
                                htmlFor="limited"
                                className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                            >
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-2">
                                    <FileText className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg">
                                    Limited Contract
                                </span>
                            </Label>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Fixed-term contract with specific end date.
                                Common in free zones like JAFZA, DMCC, DDA.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-green-400  transition-all duration-300 bg-white/70 backdrop-blur-sm has-[button[data-state=checked]]:border-green-400">
                        <RadioGroupItem
                            value="unlimited"
                            id="unlimited"
                            className="mt-2 w-full h-full border-2 border-green-500 absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="flex-1">
                            <Label
                                htmlFor="unlimited"
                                className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                            >
                                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-2">
                                    <Clock className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg">
                                    Unlimited Contract
                                </span>
                            </Label>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Open-ended contract with no specific end date.
                                More flexible for both parties.
                            </p>
                        </div>
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
}
