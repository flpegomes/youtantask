import { Task } from '@/app/page'
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
import { PencilLine } from 'lucide-react'
import { useState } from 'react'

export function EditDescriptionTaskDialog({
  task,
  onEditDescription,
}: {
  task: Task
  onEditDescription: (newDescription: string) => void
}) {
  const [taskDescription, setTaskDescription] = useState(task.description)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PencilLine
          size={16}
          className="text-primary cursor-pointer shrink-0"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar descrição da task</DialogTitle>
          <DialogDescription>
            Edite sua tarefa aqui, com uma descrição simples.
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
              onClick={() => onEditDescription(taskDescription)}
            >
              Editar tarefa
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
