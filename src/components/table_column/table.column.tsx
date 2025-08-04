import { TaskType } from "../../types/TaskType";
import './table.column.scss'
import { ColumnTableType } from "../../types/ColumnType";
import Task from "../task/task.component";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface TableColumnProps {
    column: ColumnTableType;
    tasks: TaskType[];
    loadTask: () => void;
}

const TableColumn = ({ column, tasks, loadTask }: TableColumnProps) => {
    // const { setNodeRef } = useDroppable({
    //     id: column.idColumn
    // })

    const { setNodeRef } = useDroppable({
        id: `column-${column.idColumn}`,
    });

    return (
        <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4 min-h-[100px]" ref={setNodeRef} >
            <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
            <div className="flex flex-1 flex-col gap-4"
            >
                <SortableContext
                    id={`column-${column.idColumn}`}
                    items={tasks.map(task => task.idTask)}

                    // id={column.idColumn.toString()}
                    // items={tasks.map((task) => task.idTask.toString())}

                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <Task key={task.idTask} taskData={task} loadTask={loadTask} />
                    ))}
                </SortableContext>
            </div>
        </div >

        // <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4 min-h-[100px]">
        //     <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
        //     {tasks.length > 0 ? (
        //         <div className="flex flex-1 flex-col gap-4" ref={setNodeRef}>
        //             {tasks.map((task) => (
        //                 <Task key={task.idTask} taskData={task} loadTask={loadTask} />
        //             ))}
        //         </div>
        //     ) :
        //         <div className="flex flex-1 flex-col gap-4" ref={setNodeRef}>
        //             Nhập task của bạn
        //         </div>
        //     }
        // </div>

    )
}

export default TableColumn;