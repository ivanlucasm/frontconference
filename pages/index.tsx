import inputStyle from '../styles/components/input.module.scss'
import buttonStyle from '../styles/components/button.module.scss'
import Layout from '../components/layout'
import { SyntheticEvent, FormEvent, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()

    const [user, setUser] = useState({ registration: '' })

    const registrationInput = useRef(null)

    useEffect(() => {
        if (user.registration) router.push(`/home?registration=${user.registration}`, 'home')
        registrationInput.current.focus()
    }, [user])

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            registration: { value: string }
        }
        const registration = target.registration.value
        setUser({ registration: registration })
    }

    return (
        <Layout title="Login">
            <main>
                <form method="post" onSubmit={(e: FormEvent) => handleSubmit(e)}>
                    <label className={inputStyle.label}>
                        {/* <span className={inputStyle.span}>Matrícula</span> */}
                        <input
                            ref={registrationInput}
                            type="text"
                            name="registration"
                            className={inputStyle.input}
                            placeholder="Insira sua matrícula"
                            required
                        />
                    </label>
                    <button type="submit" className={buttonStyle.button}>
                        Entrar
                    </button>
                </form>
            </main>
        </Layout>
    )
}
