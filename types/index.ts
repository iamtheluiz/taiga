export type Command = {
  id: string
  name: string
  type: 'shell' | 'program' | 'website' | 'focus'
  content: any
  default: boolean
}
