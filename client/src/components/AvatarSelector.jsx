import { RadioGroup } from '@headlessui/react'
function AvatarSelector({ avatars, setFormData, formData }) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  return (
    <RadioGroup name="avatar_id" onChange={(e) => setFormData({ ...formData, ["avatar_id"]: e })} className="border rounded-md bg-white p-4">
        <RadioGroup.Label className="flex justify-center text-lg font-bold leading-6 text-[#182934]">
            Choose a profile picture
        </RadioGroup.Label>
        <div className='mt-4 flex flex-wrap justify-center items-center gap-3 '>
            {avatars.map((avatar) => (
                <RadioGroup.Option
                key={avatar.id}
                value={avatar.id}
                name="avatar_id"
                className={({ active, checked }) =>
              classNames(
                active && checked ? 'ring ring-offset-1' : '',
                !active && checked ? 'ring-2' : '',
                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
              )
            }
                >
                    <RadioGroup.Label as="span" className="sr-only">
                        {avatar.name}
                    </RadioGroup.Label>
                    <div className='h-14 w-14 rounded-full border border-black border-opacity-10 overflow-hidden'>
                        <img src={avatar.image_url} alt={avatar.name} />
                    </div>
                </RadioGroup.Option>
            ))}

        </div>

    </RadioGroup>
  )
}
export default AvatarSelector