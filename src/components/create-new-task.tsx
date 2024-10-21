import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export function CreateNewTaskButton({
  createTask,
}: {
  createTask: (description: string) => void
}) {
  const [taskDescription, setTaskDescription] = useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar nova task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar nova task</DialogTitle>
          <DialogDescription>
            Crie sua nova tarefa aqui, com uma descrição simples.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-row items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Descrição
            </Label>
            <Input
              placeholder="Digite uma descrição simples."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              disabled={taskDescription.length <= 2}
              onClick={() => createTask(taskDescription)}
            >
              Criar tarefa
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
