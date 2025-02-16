import {Check, X} from "lucide-react";
import {cn} from "~/utils/cn";

const TableBadge = ({completed}: { completed: boolean }) => {
    return (
        <span
            className={cn('relative rounded  px-[0.3rem] py-[0.2rem] font-mono ' +
                'text-sm font-semibold inline-flex items-center gap-2 hover:bg-green-500/20 transition-colors cursor-default',
                completed ? "bg-green-500/10 hover:bg-green-500/20" : "bg-red-500/10 hover:bg-red-500/20"
            )}>
            {
                completed ?
                    (
                        <>
                            <Check className="h-4 w-4 text-green-500"/>
                            Yes
                        </>
                    ) :
                    (
                        <>
                            <X className="h-4 w-4 text-red-500"/>
                            No
                        </>
                    )
            }
        </span>
    );
};

export default TableBadge;
