import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";
import type {ReactNode} from "react";

type Props = {
    children: ReactNode,
    tooltipContent: string
}

const ActionToolTip = ({children, tooltipContent}: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    {tooltipContent}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ActionToolTip;
