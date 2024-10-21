'use client'

import { Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Task } from '@/app/page'

const chartConfig = {
  completed: {
    label: 'Completed Tasks',
    color: '#22c55e',
  },
  incomplete: {
    label: 'Incomplete Tasks',
    color: '#ef4444',
  },
} satisfies ChartConfig

export function ChartTask({ tasks }: { tasks: Task[] }) {
  const completedTasks = tasks.filter((task) => task.completed).length
  const incompleteTasks = tasks.filter((task) => !task.completed).length

  const dataChart = [
    {
      status: 'completed',
      count: completedTasks,
      color: 'hsl(var(--chart-5))',
      fill: 'var(--color-completed)',
    },
    {
      status: 'incomplete',
      count: incompleteTasks,
      fill: 'var(--color-incomplete)',
    },
  ]
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tasks Overview</CardTitle>
        <CardDescription>Analyze tasks by status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]  pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={dataChart} dataKey="count" label nameKey="status" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
