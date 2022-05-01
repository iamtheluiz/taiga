import { v4 as uuidv4 } from 'uuid'

export class Command {
  public readonly id!: string

  public name: string
  public content: string
  public type: string

  constructor(props: Omit<Command, 'id'>, id?: string) {
    this.name = props.name
    this.content = props.content
    this.type = props.type

    if (!id) {
      this.id = uuidv4()
    }
  }
}
