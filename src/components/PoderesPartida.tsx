import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import LoginService from '@/services/login-service';

type OptionKey = 'horizontalSweeper' | 'verticalSweeper' | 'columnLocker';

const switches = [
  { label: 'Destruição Horizontal', key: 'horizontalSweeper' },
  { label: 'Destruição Vertical', key: 'verticalSweeper' },
  { label: 'Bloqueio de Coluna', key: 'columnLocker' },
];

export default function PoderesPartida() {
  const [options, setOptions] = useState<Record<OptionKey, boolean>>({
    horizontalSweeper: false,
    verticalSweeper: false,
    columnLocker: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginService : LoginService = new LoginService();

  const handleChange = (option: OptionKey) => {
    if(isLoading) return;
    var newValue : boolean = !options[option];
    loginService.save(option,newValue).finally(() => setIsSaving(false));
    setOptions((prevOptions) => {
        setIsSaving(true);
      return ({...prevOptions, [option]: newValue})
    });
  };

  const loadConfig = () => {
    setIsLoading(true);
    loginService.getConfig().then((result) => {
      if(result){
          setOptions((prevOptions) => {
            return ({...prevOptions, ['horizontalSweeper']: result.horizontalSweeper})
          });
          setOptions((prevOptions) => {
            return ({...prevOptions, ['verticalSweeper']: result.verticalSweeper})
          });
          setOptions((prevOptions) => {
            return ({...prevOptions, ['columnLocker']: result.columnLocker})
          });
      }
    }).finally(() => setIsLoading(false));
  };

  // Executa loadConfig quando o componente é montado
  useEffect(() => {
    loadConfig();
  }, []);

  return (
    <div className="w-full max-w-lg space-y-5">
      <h2 className='mb-10 text-start text-2xl font-bold leading-9 tracking-tight text-greenwhite-300'>Poderes da Partida</h2>
      {switches.map((switchOption) => (
        <div key={switchOption.key} className="flex items-center gap-x-4 sm:col-span-2">
          <Switch
            disabled={isSaving || isLoading}
            checked={options[switchOption.key as OptionKey]}
            onChange={() => handleChange(switchOption.key as OptionKey)}
            className={classNames(
              options[switchOption.key as OptionKey] ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                options[switchOption.key as OptionKey] ? 'translate-x-5' : 'translate-x-0',
                'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
          <span className="text-black">{switchOption.label}</span>
        </div>
      ))}
    </div>
  );
}
