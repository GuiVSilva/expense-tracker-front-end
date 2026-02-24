import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { donutColors, formatCurrency } from '../utils/reportsUtils'

export const CategoryDonutChart = ({ data }) => {
  const gradientSegments = data
    .reduce(
      (acc, item, index) => {
        const nextValue = acc.current + item.percent
        const color = donutColors[index % donutColors.length]

        acc.parts.push(`${color} ${acc.current}% ${nextValue}%`)
        acc.current = nextValue
        return acc
      },
      { parts: [], current: 0 }
    )
    .parts.join(', ')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuicao por categoria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-center">
          <div
            className="relative size-44 rounded-full"
            style={{
              background: `conic-gradient(${gradientSegments || '#334155 0% 100%'})`
            }}
          >
            <div className="absolute inset-7 rounded-full bg-card border border-border" />
          </div>
        </div>

        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: donutColors[index % donutColors.length] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium text-foreground">
                {item.percent.toFixed(1)}% ({formatCurrency(item.amount)})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
