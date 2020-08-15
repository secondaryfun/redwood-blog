import BlogLayout from 'src/layouts/BlogLayout'
import {
  Label,
  TextField,
  FormError,
  TextAreaField,
  Submit,
  FieldError,
  useMutation,
} from '@redwoodjs/web'
import { Form } from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`
const ContactPage = () => {
  const formMethods = useForm()
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      formMethods.reset()
      alert('Thank you for your message!')
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
    console.log(data)
  }
  return (
    <BlogLayout>
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        formMethods={formMethods}
        error={error}
      >
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'blue' }}
        />
        <Label name="name" errorClassName="error">
          Your name
        </Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError
          name="name"
          style={{ display: 'block', color: 'red' }}
          className="error"
        />

        <Label name="email" errorClassName="error">
          Your email
        </Label>
        <TextField
          name="email"
          errorClassName="error"
          // validation={{ required: true, pattern: { value: /[^@]+@[^.]+\..+/ } }}
        />
        <FieldError
          name="email"
          style={{ display: 'block', color: 'red' }}
          className="error"
        />

        <Label name="message" errorClassName="error">
          Your message
        </Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError
          name="message"
          style={{ display: 'block', color: 'red' }}
          className="error"
        />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
