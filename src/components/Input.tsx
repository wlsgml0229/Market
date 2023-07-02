import React from 'react'
//유효성체크, 타이핑 렌더링 수 최적화 사용가능, input이용할떄 라이브러리 사용
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  type?: string
  disable?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disable,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <span className="absolute text-neutral-700 top-5 left-2">₩</span>
      )}
      <input
        id={id}
        disabled={disable}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`
           w-full
           p-4
           pt-6
           font-light
           bg-white
           rounded-md
           outline-none
           transition
           disabled:opacity-70
           disabled:cursor-not-allowed 
           ${formatPrice ? 'pl-9' : 'pl-4'} 
           ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
           ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}  
           `}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
        ${formatPrice ? 'left-9' : 'left-4'}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? 'text-rose-500' : 'text-zink-400'}
        `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
