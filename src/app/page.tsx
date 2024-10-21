'use client'

import { Header } from '@/components/header'
import { TableTasks } from '@/components/table-tasks'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'

export interface Task {
  id: string
  description: string
  completed: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { toast } = useToast()

  // Fetch de dados com a API (mockapi.io)
  async function fetchTasks(): Promise<Task[]> {
    const res = await fetch(
      `https://67100dffa85f4164ef2cebe6.mockapi.io/task`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      },
    )

    if (res.ok) {
      return res.json()
    }
    return []
  }

  // Criar task
  async function createTask(description: string) {
    const newTask = {
      description,
      completed: false,
    }

    const task = fetch('https://67100dffa85f4164ef2cebe6.mockapi.io/task', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTask),
    }).then((res) => {
      if (res.ok) {
        toast({
          description: 'Task criada com sucesso.',
          variant: 'success',
        })
        return res.json()
      }

      toast({
        description: 'Falha ao criar a task',
        variant: 'destructive',
      })

      return false
    })

    return task
  }

  // Editar Task
  async function editTask(task: Task) {
    const response = fetch(
      `https://67100dffa85f4164ef2cebe6.mockapi.io/task/${task.id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          description: task.description,
          completed: task.completed,
        }),
      },
    ).then((res) => {
      if (res.ok) {
        toast({
          description: 'Task editada com sucesso.',
          variant: 'success',
        })

        return res.json()
      }

      toast({
        description: 'Falha ao editar a task',
        variant: 'destructive',
      })

      return false
    })

    return response
  }

  // Deletar Task
  async function deleteTask(id: string) {
    const res = await fetch(
      `https://67100dffa85f4164ef2cebe6.mockapi.io/task/${id}`,
      {
        method: 'DELETE',
      },
    )

    if (res.ok) {
      toast({
        description: 'Task deletada com sucesso.',
        variant: 'success',
      })

      return true
    }

    toast({
      description: 'Falha ao deletar a task',
      variant: 'destructive',
    })

    return false
  }

  useEffect(() => {
    fetchTasks().then(setTasks)
  }, [])

  const handleCreate = async (description: string) => {
    const createdTask = await createTask(description)

    if (createdTask) {
      const updateList = [...tasks, createdTask]
      setTasks(updateList)
    }
  }

  const handleDelete = async (id: string) => {
    const isDeleted = await deleteTask(id)

    if (isDeleted) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    }
  }

  const handleEdit = async (task: Task) => {
    const taskEdited = await editTask(task)

    if (taskEdited) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? taskEdited : t)),
      )
    }
  }

  return (
    <div className="mb-4 py-4 max-md:px-4">
      <Header />
      <main className="mx-auto flex h-full w-full max-w-[1300px] flex-col items-center justify-start gap-24">
        <div className="flex flex-col gap-4">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">
            Tasks
          </h1>
          <TableTasks
            data={tasks}
            onDelete={handleDelete}
            onCreate={handleCreate}
            onEdit={handleEdit}
          />
        </div>
      </main>
    </div>
  )
}
