"use client"

const code = `function quickSort(arr) {
  if (arr.length <= 1) return arr
  const pivot = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}`

const variables = [
  { name: "arr", value: "[8, 3, 5, 1, 9, 2]", type: "Array<number>" },
  { name: "pivot", value: "8", type: "number" },
  { name: "left", value: "[3, 5, 1, 2]", type: "Array<number>" },
  { name: "right", value: "[9]", type: "Array<number>" },
  { name: "i", value: "5", type: "number" },
]

const callStack = [
  { fn: "quickSort", args: "[8,3,5,1,9,2]", depth: 0 },
  { fn: "quickSort", args: "[3,5,1,2]", depth: 1 },
  { fn: "quickSort", args: "[5,1,2]", depth: 2 },
  { fn: "quickSort", args: "[1,2]", depth: 2 },
]

export default function SaaSFeatureCard() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl bg-[#0a0a0a] flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/5 via-transparent to-[#e8dcc8]/5" />

      <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5 relative z-10">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="text-[5px] tracking-wider text-[#e8dcc8]/40 ml-2 font-mono">
          algorithm.ts — QuickSort
        </span>
      </div>

      <div className="flex-1 flex gap-[1px] px-1 pb-1 relative z-10 min-h-0">
        <div
          className="w-[28%] rounded-[3px] bg-[#ffffff08] backdrop-blur-sm border border-[#ffffff08] p-1.5 flex flex-col gap-1 overflow-hidden"
          style={{ boxShadow: '0 0 12px rgba(201,168,76,0.06)' }}
        >
          <span className="text-[4.5px] font-semibold tracking-wider text-[#c9a84c] uppercase">
            Variables
          </span>
          {variables.map((v, i) => (
            <div key={i} className="flex flex-col gap-[1px]">
              <div className="flex items-center justify-between">
                <span className="text-[4px] font-mono text-[#e8dcc8]">{v.name}</span>
                <span className="text-[3.5px] font-mono text-[#e8dcc8]/30">{v.type}</span>
              </div>
              <div className="text-[4px] font-mono text-[#e8dcc8]/70 truncate bg-[#ffffff04] rounded-[1px] px-1 py-[1px]">
                {v.value}
              </div>
            </div>
          ))}
          <div className="mt-auto pt-1 border-t border-[#ffffff08]">
            <div className="flex items-center justify-between text-[3.5px] text-[#e8dcc8]/30 font-mono">
              <span>Time: O(n log n)</span>
              <span>Space: O(log n)</span>
            </div>
          </div>
        </div>

        <div
          className="flex-1 rounded-[3px] bg-[#ffffff04] backdrop-blur-sm border border-[#ffffff08] p-1.5 overflow-hidden relative"
          style={{ boxShadow: 'inset 0 0 20px rgba(201,168,76,0.04), 0 0 12px rgba(201,168,76,0.06)' }}
        >
          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#c9a84c]/8 to-transparent rounded-bl-full" />

          <div className="flex items-center gap-1 mb-1">
            <span className="text-[3.5px] px-1 py-[1px] rounded-[2px] bg-[#c9a84c]/15 text-[#c9a84c] font-mono">
              quickSort
            </span>
            <span className="text-[3.5px] text-[#e8dcc8]/20 font-mono">executing</span>
          </div>

          <pre className="text-[3.8px] leading-[1.6] font-mono text-[#e8dcc8]/80 overflow-hidden">
            {code.split('\n').map((line, i) => {
              const isHighlighted = i >= 5 && i <= 7
              const isPivot = line.includes('pivot = arr[0]')
              const accent = isPivot ? '#c9a84c' : isHighlighted ? '#e8dcc8' : undefined
              return (
                <div
                  key={i}
                  className="whitespace-pre"
                  style={{
                    background: isHighlighted ? 'rgba(201,168,76,0.08)' : undefined,
                    borderLeft: isHighlighted ? '1px solid rgba(201,168,76,0.4)' : undefined,
                    paddingLeft: isHighlighted ? 2 : 0,
                    color: accent,
                  }}
                >
                  {line}
                </div>
              )
            })}
          </pre>

          <div className="absolute bottom-1 right-1 flex gap-[2px]">
            {[0, 1, 2, 3, 4, 5].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{
                  background: i < 4 ? '#c9a84c' : '#ffffff15',
                  boxShadow: i < 4 ? '0 0 4px rgba(201,168,76,0.5)' : undefined,
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="w-[22%] rounded-[3px] bg-[#ffffff08] backdrop-blur-sm border border-[#ffffff08] p-1.5 flex flex-col gap-1 overflow-hidden"
          style={{ boxShadow: '0 0 12px rgba(201,168,76,0.06)' }}
        >
          <span className="text-[4.5px] font-semibold tracking-wider text-[#c9a84c] uppercase">
            Call Stack
          </span>
          <div className="flex flex-col gap-[1px] flex-1">
            {callStack.map((frame, i) => (
              <div
                key={i}
                className="rounded-[2px] px-1 py-[1px] border-l-[1.5px]"
                style={{
                  borderColor: i === 0 ? '#c9a84c' : `rgba(201,168,76,${0.4 - i * 0.1})`,
                  background: i === 0 ? 'rgba(201,168,76,0.08)' : undefined,
                  marginLeft: `${frame.depth * 3}px`,
                }}
              >
                <div className="text-[4px] font-mono text-[#e8dcc8] leading-tight">{frame.fn}</div>
                <div className="text-[3px] font-mono text-[#e8dcc8]/30 truncate">
                  ({frame.args})
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 mt-auto pt-1 border-t border-[#ffffff08] text-[3.5px] text-[#e8dcc8]/20 font-mono">
            <div className="w-1 h-1 rounded-full bg-[#28c840] animate-pulse" />
            Running
          </div>
        </div>
      </div>

      <div className="relative z-10 px-2 pb-2 pt-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[3.5px] font-mono text-[#e8dcc8]/20">
            Execution Timeline
          </span>
          <span className="text-[3.5px] font-mono text-[#e8dcc8]/20">
            342ms / 1.2s
          </span>
        </div>
        <div className="relative h-[3px] rounded-full bg-[#ffffff08] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: '32%',
              background: 'linear-gradient(90deg, #c9a84c, #e8dcc8)',
              boxShadow: '0 0 6px rgba(201,168,76,0.4)',
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-[#e8dcc8]"
            style={{
              left: '32%',
              boxShadow: '0 0 6px rgba(201,168,76,0.6)',
            }}
          />
        </div>
        <div className="flex justify-between mt-[1px]">
          {['init', 'partition', 'recurse L', 'recurse R', 'merge', 'complete'].map((label, i) => (
            <span
              key={i}
              className="text-[3px] font-mono"
              style={{ color: i <= 1 ? '#c9a84c' : '#e8dcc8/15' }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-1/3 left-0 w-6 h-6 rounded-full bg-[#c9a84c]/4 blur-xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-8 h-8 rounded-full bg-[#e8dcc8]/3 blur-xl pointer-events-none" />
    </div>
  )
}
