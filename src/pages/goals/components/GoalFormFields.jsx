import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { colorOptions } from '../utils/goalUtils'

export const GoalFormFields = ({ form, setForm }) => {
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="goal-name">Nome da meta</Label>
        <Input
          id="goal-name"
          value={form.name}
          placeholder="Ex: Reforma da casa"
          onChange={event => setForm({ ...form, name: event.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="goal-target">Valor alvo</Label>
          <Input
            id="goal-target"
            type="number"
            min="1"
            value={form.target}
            placeholder="10000"
            onChange={event => setForm({ ...form, target: event.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goal-deadline">Prazo</Label>
          <Input
            id="goal-deadline"
            type="date"
            value={form.deadline}
            onChange={event => setForm({ ...form, deadline: event.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Icone</Label>
          <Select
            value={form.iconKey}
            onValueChange={value => setForm({ ...form, iconKey: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="target">Alvo</SelectItem>
              <SelectItem value="shield">Reserva</SelectItem>
              <SelectItem value="plane">Viagem</SelectItem>
              <SelectItem value="car">Carro</SelectItem>
              <SelectItem value="piggy">Porquinho</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Cor</Label>
          <Select
            value={form.colorKey}
            onValueChange={value => setForm({ ...form, colorKey: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(colorOptions).map(([key, color]) => (
                <SelectItem key={key} value={key}>
                  {color.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal-description">Descricao</Label>
        <textarea
          id="goal-description"
          value={form.description}
          onChange={event => setForm({ ...form, description: event.target.value })}
          placeholder="Descreva o objetivo da meta"
          className="border-input focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full rounded-md border bg-transparent p-3 text-sm outline-none focus-visible:ring-[3px]"
        />
      </div>
    </div>
  )
}
