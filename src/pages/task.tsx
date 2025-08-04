import { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { createTask, fetchGoalAPI, getAllColumn, getTaskByIdGoal } from "../services/api.me.service";
import { TaskType } from "../types/TaskType";
import Task from "../components/task/task.component";
import { useParams } from "react-router-dom";
import { ColumnTableType } from "../types/ColumnType";
import TableColumn from "../components/table_column/table.column";
import { closestCorners, DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { PlusCircleOutlined } from "@ant-design/icons";
import ButtonComponent from "../components/button/ButtonComponent";

const TaskPage = () => {

    const [taskData, setTaskData] = useState<TaskType[]>([]);
    const [columnData, setColumnData] = useState<ColumnTableType[]>([]);
    const { idGoal } = useParams();

    const loadTask = async () => {
        const res = await getTaskByIdGoal(idGoal);
        if (res.data) {
            setTaskData(res.data);
        }
    }

    const loadColumn = async () => {
        const res = await getAllColumn(idGoal);
        if (res.data) {
            setColumnData(res.data);
        }
    }
    useEffect(() => {
        loadTask();
        loadColumn();
    }, [])

    // const handleDragEnd = (event: DragEndEvent) => {
    //     const { active, over } = event;

    //     if (!over) return;
    //     const taskId = active.id as string;
    //     const newStatus = over.id as TaskType['idColumn'];

    //     setTaskData((prev) => prev.map((task) =>
    //         task.idTask === Number(taskId) && task.idColumn !== newStatus ?
    //             {
    //                 ...task,
    //                 idColumn: newStatus
    //             }
    //             :
    //             task
    //     ));
    // }

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        setTaskData((tasks) => {
            const activeIndex = tasks.findIndex((t) => t.idTask === active.id);
            const overIndex = tasks.findIndex((t) => t.idTask === over.id);
            const activeTask = tasks[activeIndex];

            // Xác định cột đích: over.id có thể là id cột (column-<id>)
            let targetColumnId: number | undefined;
            if (typeof over.id === 'string' && over.id.startsWith('column-')) {
                targetColumnId = Number(over.id.split('-')[1]);
            } else {
                targetColumnId = tasks[overIndex]?.idColumn;
            }

            // Nếu kéo sang cột khác thì cập nhật idColumn
            if (targetColumnId && targetColumnId !== activeTask.idColumn) {
                return tasks.map((t) =>
                    t.idTask === activeTask.idTask ? { ...t, idColumn: targetColumnId! } : t,
                );
            }

            // Nếu vẫn trong cùng cột thì sắp xếp lại
            if (overIndex !== -1 && tasks[activeIndex].idColumn === tasks[overIndex].idColumn) {
                return arrayMove(tasks, activeIndex, overIndex);
            }
            return tasks;
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        // Chỉ cần đổi thứ tự khi cùng cột
        setTaskData((tasks) => {
            const oldIndex = tasks.findIndex((t) => t.idTask === active.id);
            const newIndex = tasks.findIndex((t) => t.idTask === over.id);
            if (tasks[oldIndex] && tasks[newIndex] &&
                tasks[oldIndex].idColumn === tasks[newIndex].idColumn) {
                return arrayMove(tasks, oldIndex, newIndex);
            }
            return tasks;
        });
    };

    // const handleDragEnd = (event: DragEndEvent) => {
    //     const { active, over } = event;

    //     if (!over || active.id === over.id) return;

    //     setTaskData((items) => {
    //         const oldIndex = items.findIndex((t) => t.idTask === active.id);
    //         const newIndex = items.findIndex((t) => t.idTask === over.id);

    //         // if (items[oldIndex].idColumn === items[newIndex].idColumn) {
    //         //     return arrayMove(items, oldIndex, newIndex);
    //         // }
    //         if (items[oldIndex] && items[newIndex] && items[oldIndex].idColumn === items[newIndex].idColumn) {
    //             return arrayMove(items, oldIndex, newIndex);
    //         }
    //         return items;
    //     });
    // }

    // const handleDragOver = (event: DragOverEvent) => {
    //     const { active, over } = event;
    //     if (!over || active.id === over.id) return;

    //     setTaskData((items) => {
    //         const activeIndex = items.findIndex((t) => t.idTask === active.id);
    //         const activeTask = items[activeIndex];

    //         // Nếu over.id là chuỗi 'column-X', lấy số X làm id cột
    //         let columnId: number | undefined;
    //         if (typeof over.id === 'string' && over.id.startsWith('column-')) {
    //             columnId = Number(over.id.split('-')[1]);
    //         } else {
    //             // nếu over.id là số, lấy idColumn của task đích
    //             columnId = items.find((t) => t.idTask === over.id)?.idColumn;
    //         }

    //         if (!columnId || columnId === activeTask.idColumn) {
    //             return items;
    //         }

    //         return items.map((t) =>
    //             t.idTask === activeTask.idTask ? { ...t, idColumn: columnId! } : t
    //         );
    //     });
    // };

    // const createTaskByIdGoal = async () => {
    //     const handleCreateGoal = async () => {
    //         // if (!title || !description || !startDate || !endDate) {
    //         //     notification.error({
    //         //         message: "Missing fields",
    //         //         description: "Please fill in all required fields.",
    //         //     });
    //         //     return;
    //         // }

    //         try {
    //             const res = await createTask(

    //             );

    //             if (res?.data) {
    //                 notification.success({
    //                     message: "Goal created successfully",
    //                 });
    //                 resetAndCloseModal();
    //             }
    //         } catch (error: any) {
    //             notification.error({
    //                 message: "Create Goal Failed",
    //                 description: error?.response?.data?.message || "Unknown error",
    //             });
    //         }
    //     };
    // }

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Row gutter={[16, 16]}>
                <DndContext
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                >
                    {columnData.map((column) => (
                        <TableColumn
                            key={column.idColumn}
                            column={column}
                            tasks={taskData.filter(task => task.idColumn === column.idColumn)}
                            loadTask={loadTask} />
                    ))}
                </DndContext>
            </Row>

            {/* <Button onClick={() => { }} type="primary" icon={<PlusCircleOutlined />} iconPosition="start">
                Add
            </Button> */}
        </div>
    );


}

export default TaskPage;