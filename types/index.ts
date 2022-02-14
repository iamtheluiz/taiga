export type Command = {
  id: string
  name: string
  type: 'shell' | 'program' | 'website' | ''
  content: any
  default: boolean
}
