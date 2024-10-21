'use client'

import { Task } from '@/app/page'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LoaderCircle, Slash, Trash2 } from 'lucide-react'
import { Input } from './ui/input'
import { useState } from 'react'
import { Badge } from './ui/badge'
import { CreateNewTaskButton } from './create-new-task'
import { EditDescriptionTaskDialog } from './edit-description-task'
import { ChartTask } from './chart-task'

interface TableTasksProps {
  data: Task[]
  onDelete: (id: string) => void
  onCreate: (description: string) => void
  onEdit: (task: Task) => void
}

export function TableTasks({
  data,
  onCreate,
  onEdit,
  onDelete,
}: TableTasksProps) {
  const [filter, setFilter] = useState<boolean | 'all'>('all')
  const [searchText, setSearchText] = useState('')

  // Lista de tasks que será usada para renderizar as linhas da tabela, ja pegando os filtros dos botões.
  const filteredData = data.filter((task) => {
    const matchesFilter = filter === 'all' || task.completed === filter
    const matchesSearch = task.description
      .toLowerCase()
      .includes(searchText.toLowerCase())
    return matchesFilter && matchesSearch
  })

  function handleEditStatus(task: Task) {
    const editTask = task
    editTask.completed = !task.completed
    onEdit(editTask)
  }

  function handleEditDescription(task: Task, newDescription: string) {
    task.description = newDescription
    onEdit(task)
  }

  return (
    <div className="space-y-3">
      {data.length !== 0 && <ChartTask tasks={data} />}
      <div className="max-md:flex-col max-md:items-start flex flex-row justify-between items-center gap-5">
        <div className="max-md:w-full md:min-w-[300px]">
          <Input
            placeholder="Buscar por descrição da tarefa..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3  justify-center  items-center text-xs text-muted-foreground">
          <button
            onClick={() => setFilter('all')}
            className={`cursor-pointer ${filter === 'all' ? 'font-bold text-primary' : ''}`}
          >
            TODAS
          </button>
          <Slash className="size-3 shrink-0 -rotate-[24deg] text-muted-foreground/50" />
          <button
            onClick={() => setFilter(false)}
            className={`cursor-pointer ${!filter ? 'font-bold text-primary' : ''}`}
          >
            NÃO CONCLUÍDAS
          </button>
          <Slash className="size-3 shrink-0 -rotate-[24deg] text-muted-foreground/50" />
          <button
            onClick={() => setFilter(true)}
            className={`cursor-pointer ${filter && filter !== 'all' ? 'font-bold text-primary' : ''}`}
          >
            CONCLUÍDAS
          </button>
        </div>

        <CreateNewTaskButton
          createTask={(description: string) => onCreate(description)}
        />
      </div>
      <div className="w-full max-w-[1000px] border-[1px] rounded-md">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="">Id</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell />
                <TableCell className="flex justify-end">
                  <LoaderCircle className="animate-spin text-gray-600" />{' '}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((task) => (
                <TableRow
                  key={task.id}
                  className={`${task.completed && 'bg-muted/40 text-muted-foreground/60'} max-md:flex-col max-md:text-xs`}
                >
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    {!task.completed ? (
                      <Badge variant={'outline'}>Em andamento</Badge>
                    ) : (
                      <Badge variant={'default'}>Concluído</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-end">
                    <div className="flex flex-row gap-5 items-center">
                      <EditDescriptionTaskDialog
                        task={task}
                        onEditDescription={(newDescription: string) =>
                          handleEditDescription(task, newDescription)
                        }
                      />
                      <Trash2
                        size={16}
                        className="text-red-500 cursor-pointer shrink-0"
                        onClick={() => onDelete(task.id)}
                      />
                      <div
                        className="text-xs cursor-pointer hover:text-primary transition-all text-primary/50"
                        onClick={() => handleEditStatus(task)}
                      >
                        {task.completed
                          ? 'Marcar em andamento'
                          : 'Marcar como concluído'}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
