import { useCalculator } from "@/state/calculator";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Building, FileText, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function CalculatorExitReason() {
    const exitReason = useCalculator((state) => state.exitReason);
    const setExitReason = useCalculator((state) => state.actions.setExitReason);

    return (
        <div className="space-y-6">
            <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Reason for Leaving
            </Label>

            <RadioGroup
                value={exitReason}
                onValueChange={setExitReason}
                className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                <div className="group relative">
                    <div
                        className={cn(
                            "absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300",
                            exitReason === "resignation" && "opacity-100"
                        )}
                    ></div>
                    <div
                        className={cn(
                            "relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-orange-400  transition-all duration-300 bg-white/70 ",
                            exitReason === "resignation" && "border-orange-400 "
                        )}
                    >
                        <RadioGroupItem
                            value="resignation"
                            id="resignation"
                            className="mt-2 w-full h-full border-2 border-orange-500 absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="flex-1">
                            <Label
                                htmlFor="resignation"
                                className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                            >
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-2">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg">Resignation</span>
                            </Label>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                You are voluntarily leaving your job. May affect
                                gratuity calculation based on service years.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group relative">
                    <div
                        className={cn(
                            "absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300",
                            exitReason === "termination" && "opacity-100"
                        )}
                    ></div>
                    <div
                        className={cn(
                            "relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-red-400  transition-all duration-300 bg-white/70 ",
                            exitReason === "termination" && "border-red-400 "
                        )}
                    >
                        <RadioGroupItem
                            value="termination"
                            id="termination"
                            className="mt-2 w-full h-full border-2 border-red-500 absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="flex-1">
                            <Label
                                htmlFor="termination"
                                className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                            >
                                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-2">
                                    <Building className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg">
                                    Termination by Employer
                                </span>
                            </Label>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Your employer is ending your contract. Usually
                                qualifies for full gratuity rights.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group relative">
                    <div
                        className={cn(
                            "absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300",
                            exitReason === "completion" && "opacity-100"
                        )}
                    ></div>
                    <div
                        className={cn(
                            "relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-green-400  transition-all duration-300 bg-white/70 ",
                            exitReason === "completion" && "border-green-400"
                        )}
                    >
                        <RadioGroupItem
                            value="completion"
                            id="completion"
                            className="mt-2 w-full h-full border-2 border-green-500 absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="flex-1">
                            <Label
                                htmlFor="completion"
                                className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                            >
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-2">
                                    <FileText className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg">
                                    Contract Completion
                                </span>
                            </Label>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Your contract term has naturally ended.
                                Qualifies for full gratuity payment.
                            </p>
                        </div>
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
}
