import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const VideoShowcase = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Since we couldn't download videos, we'll use placeholder video URLs
  // In a real implementation, these would be your downloaded video files
  const videos = [
    {
      id: 1,
      title: 'Global Logistics Network',
      description: 'Our worldwide distribution centers ensure fast, reliable shipping to any destination.',
      thumbnail: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMWFRUXFhcYFxcYGBcWGhgXGBoYGBYYGBoYICggGBolHhgYITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0dHSUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAAIDBAUHAQj/xABNEAABAwEEBQgFCQUGBAcAAAABAgMRAAQSITEFBkFRYRMiMnGBkaGxB0LB0fAUM0NSU2JygpIVI6Ky4SRzk6PC8RZEY9I0VIOzw9Pi/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKREBAQACAQMDAwMFAAAAAAAAAAECEQMSITETQWEEIlGR0eEUIzKBof/aAAwDAQACEQMRAD8Axm2EpaN0KJPOmUjAn1h0sZECciKH7WzfJTxgHdjzj449XVRAUQkyJx7sIG6sxtvnmTiQRPEgk+Zp02RatFutpCyJRvGzr3Vuas6xqs/QhQIhbLhNxzZKT6jm4jqOE1qWREJGcHtG0DyHdQpprRqr6nGthxAmDGJIG+lO3hXVLNVLrJYW/wDxDAIbUqFIIgtLzukbPjYRWDW9oi3coeSUJ5RJQo5SCCEzvKSZBz7zWCmunjy3GeU1Tq8r2rdh0W68FKQiUpi8owAJyEnadgzNWlSIryipnVtptoPWl6EnopTAKu/L4wrKtNoYT0GgBsvEqP8AFdFZ+pBplU9LSjkk9xqVzSQGRA6oH8oPnUKtITx6yo+6l6sPR/yZf1T24ede/JVcP1J99RC0KOSJ/Kv/ALqcHlzFyPygfzUeoNJBZFb0/qHsp6bGfrI7/wClRFbn3cv+nuyxFRtWl0jAgf4Y8wKXqU5Jvu0hoV3en9X9K9GhXd6P1VTFstH2n8TVStaSf+se9r2io9TP4b/2Pxl+s/ZbOh3BmpsdbiB5kTV9nVR1WT1l6vlLPvrINudOcK6+S91Jq0lX0Y/h/pVzlvuxzmO/t21LTqfaxkltf4HmVeSqzLToO0o6TDo/KSO8SKjtLhGPIiPwrPksUxu3hHqqT+G+j/Uafqp0gcaUnpJUOsEedRzWijTZ+1cHW4o+Fw046SSrNYV+JKD4ru0/UGmZNKa0SW1eqk/hCv8ARIqNVlSZiRG4hUde2n1wtKM0pqRxgjHMbx7d1MCarYeVc0Ro5y0OpZbHOUc9iQOko8BVUJop0E5yFiedTgt1zkr20ISkKUBukq8KWV1NiL2k9JtWVr5LZDzfpXfWdVtxHq/A4ijrhJ9lONmcXzhgnDE4GDPRB6WWdaw0WABAO4qVBUoyq6RA5oIIEDAxtrku7W+OsZ8qOjrCF4nE7J6ImRjvIz3ZVqFkjBRkjCcDhlAjCNojdxp3JkGM4y4xHuFWXE7NwnsyPWcfA1Uibd1AlZGEHuJpVJcXsy4R20qCaDzhuRAnHHenDDhlMcaqMMgkSbu8wTHdJ2GrhZmAMtp6qhdRiDh/tt8D30t99L6L09Sw4BdEgwCDgcc8h58JrD0vaOSbKkTJymDirzOMdlazmwbvb7sTWNp9vnIRh08SCCDAJwjDOKaKqaHZ5Pn7UpWv9KSR4gViCiR83LO8relKP1rTPgFUOmt+KdkVIw2VqCRmTH+/Cjy+iz2W+rmttjmDaVHNR++o9wgZCh7VDR3KOTGA+D7u+rfpBfvut2RHqwVR9dXRHYDP5qnky9hIHn3XHyp0qCEbxs+6k59dR2fRIXke1Sgn3mi6yWBttpa1AFLQuIBAgriVq9nfQTbbReUTATwGA7hhWV7G00aBQM3EDtUfdUyNGMgfPI7E+9VDjYk1444cpwoMS8hZxm6exCPaDS/so+kc7AkeSaF71KaCFPLWUes6fzR7K9VarMNrv6jQrNT2ZWdBtS1KK1SypV2BN4yQcZynDKp7EzBVyxKhhdKfHpCa09UtIWNlYNpZccEDoKQmTxBTJ/VWjrRpvR7mNlYebP3lIu90KP8AFWNzybTDFj8nZdoc7zTQ/ZI6SwOKUq/mSay7RaZETUVrstw3T9VCuq+lKwOvnCqxytRljI0VLsk/Od7KPYkV7cs5yeSPyqH8qxWKmxE5A079mr3Ed/uq91DXFjaOT7f6nPIrNRL1evdF1B7Y9lZpsjgxKZ6/61HiM0ju9tG6Ft/QLicZBH3SD4GKaizuhJUhXKBPSGN5A33TiOtNV+XBgYjqUaJtEaPBRyzRPKIxgmQoDNPaKcDNsVrvCRAWnMRIIykg5g5EceNS6WsaU3HWxDToMCZ5NaY5RonMxIIJzStO2aj0pZEsvJeb+bcSFpHBXTT2E+VX7JzkrYOTkKbO55M8mRuvAqQfxg7K1wy15TWJFE+g4XY1pOIRaEKI+6sJSf5TQvere1UXeFqa+swVDrQf/wBVfJ/iUb+kWcQkAQMQANu3siTUKESgA9h3SQO/AePCpuXvtNrM85OMbSjpjz76YVAiMcMMYB+JmsFq7ioiMN/sHlU0AyT19m32146zJMcTHH4FWLOiEzBjI7sp7MjjxpK1dbMTe2R+kHrxilU6bKTkR3bdvjSpK7tSw2E3SqNkDtz86puWeZmBsnE4ZTvrfYeAaAPWeJNUrUUxG+OyM/jjXJjneq17+f0+HozEPvScDhhWRbxLidwSfYPfRHaG1GdoABJz4AnvrCtAlR+PjKuvHw8Dlx6crGbrIbtlQPrveDaD7XBQskEmBnRNrpgmyo28mtw9S13R4N1V1R0Mu0vgJiE84zv9Ud/lT6pJs5xZZZdOM3XQNULClhi8rYm8TwAknzNBGi3i9aXbSv77h4TghPYMOyjbXVlyyWJ0KUnnJSkBOMhZiJ6poS1WZvMgx846P0ox8xHbRhlMu8TycWXHdZNXWNfJWRtG3FSuJOJ8Sa5zMmjb0gP4BPAD20Bk0XyzX7GyTMAmM4xqK1N3VrTndUpM9RI9ldH9GGi1/J35AF8EDFOREb6BbYoFbpG1ZOYyKj76rWoGdNPQ0TkKuMN3lJGcnKRuEbKJrTqwpCCsDlLoF8IClFMgHGBGAJy3Got0YMUgiprC0VKIGxKldiRJ8Aau6RswSRuOWeI2bK09XGW27cwXMWypSXArIoUhSTPAA49VPHuDNBaFetSrjLalnckExO8jLtp+m9BPWVV15tSPxJIHYTga6E8myWRybO5ybl0IWEKIJWDzVRMiJPhQFrAl9x5JfedebUvNa1KgSSUpCiYwGdc+fbPVdOE3huMyyMJK2yejIkj8RA7chUdvXK1q3qJ7CfdRk48hhKCEJAAJCYwGIAHie6gq0tm4VbBEnrmPKjiy6t1PNj06iFajliRPHZOXOrxpmTF2Ow5CVH1uFRyJOWfD/tqRhQB2ExHqxiCN2NbsHiEkZAg8L428Kk5QqmST1z5kTUZSnYR/l768Yzw2nZGwjdTCq9zT40X6oWznAbFDxGFCtsRzoIgjA9YrR0I/dIj1TSAh05ZP3TiPsl30/wB27mOoKvfprJsirzY3pMd2IPxuort6QsoV6rqFtK7ReT5K76EtW0F15TMhJIOYnnJ+DVW6m1YYXPKY4+ao6XJ5Qq2L535j0vGT1EVoaivn5a2knBYcQfzIMeIFamtmqD9naK13eZBgTJBziJGEAwTsNDer7ty1WdWUPN9xWAfAmpmcym5WmfBnx5SZTQ20YCGUpnouLA2Z4EcRIq0GcJM44Zbojt99PLBSt1AzS8qNu297a0rCwFpUBnsHER7M+qpyy1Nr4OH1Mrj8M2yIxgZg4dfHH31at6nUkyoiZGEgHbiON6assNJS5wICh11qawMpLYIzBHccPaDWXqffHd/T4/0+U95v/n8B1CSQP6UqkDsbAe+lWndyS8evKRx6RAJERl25166s4bwInGYzxk7t1NtDKULN1d9IVAVsVGZAgHGvFA7Z/wBp91KYyKy58rdoXVTiMIwJE8c/KsQ4qV1+wVtnontrGsqbxjapRA7VQK1kceV3dquvGjX1vtlLRKEWdlAVzRPNvq271kdldQ9B+gEt2NbzqE3nHMCYJCUYR3zRJbNSLC8hKlsJKykSracMzWO06qzWVTLRQEpcNxPOkJGzAb8a58rfGtuniszuXfp3+4b9KTSbTbrPZUGUrUCoDdke4XqHNHNoQ6UNi622VhAknArMYnE9Ed9WdD2y9pB59RkWdhxX6EEeZqhoQQMd48AP61tw46wifq7PUuMu5NT9A9ry7Lnb7KFK3tanJcPX76xWESpI3kedU5hhq1aV8i4EulK73OAP0aU4xulR/hrG0m3cdeThgVRkML+GfCKdq5aYWsGeehQw6pqxpv5xSvrNpVnGxAPiDVexKVjVz0zlIyUN3AV0DR+sQbbU8lEMAoSMJnEwTnOGE5bKAGHETziYIjAycR1ddHWgtGILaebIKcQoqIMLQJievGMzU9MpsrWe1svFBbSESkSACAD2TVLQrN99F4ziueq4qvdKICHnEgQkLUB0sBsyqxq2Cq0JgbFHGY6JHtqcZq6P2EOsOj0B1lwDEi8T9YhNw/xAmsLT7pKWx/1I70qq9rVpQodbbdKQEoKgRePSOWXA99DOmdKIW3CVEm8DgCMCCk5jj41hzY28rp4spOJbtGn1NPBKENOEgAhxIcSNogHDbUD2mnLWOSU0wiCFDkWktqUoSACbyQRzjhOcZ5Vg2f5xJmcRj1YmiHVQkWhJCZPJqgbzEbCDt2Vvhj046jnzy6rupHdCqacKXGlpN5MBSYN1V6MOXGBG3CjjR+qdnWwlSmlBV1ZwKwSoGADFoUMsY4ZmjnS+r7NuZQOi42nmGEm6cOYSUKBScsiccKHmLIphm48lKVICxEtK6Qj7BM47h3Vrj2iXMdKWFLbikJQuAUgSl76x28oZwrMIAaUMlAFWSpBnDp45xnRJpfQij++KAEKWAFQxGE4TyYIOIzodcbuMrSCOcUzAaxhSCmbon63fS8AzS+mmXgYsaG3JvFxK3CSSedzSboBmazdHPQuN+HbsqNSZWQNoPfBjxiqwNTQ6Sy8VWUK2tlKv0kE+E1mCyfJ7c05PNcUHBE5KWttQPaCe0Vd1bVyjSk7FJ/mH9ah0uCux2d3ahxbZ/OhC0+La++izeOmnFn0ZzL8Xb6CtWh2bTZFNqCVlbJRPEpw7sK+UrZZ1tLUIIUhRGXrJPvFdx1U1kdCGVAJKcjeURnCdgjZNZtr1WsjzBU6m7aS64VqSteOJGUxB6WW2ubgl8a07fqsZxy/d1d+3+9/wZpNQU44tIxK0ux91xCI8UGomlwrmiAZkYwJ3TwNUdM2nkXrOoqKkqZShSiZJuG6FEnaMPGrqziPj42VvMe2q5cuX7pnj2eqVtAyy6qmctJUi78ePVVW+PKo3noy+BU3GLw+oylvynSOqlWadJI2kg0qtymjSVpbSU2tsJBVevpCQi9ECeTwTmYyzq0LYmLyikBUQQZ31W+WrggiQepWHUKn/AGxzQlSBh9bb13s6KuX2TMqDgNwg4EDEHryr3R2iFNltaxASpBPYRNVLMuzBYc+TtBYM3kpCTO/CtS1aYStBAwnZTlKz5H9v0yW2VKnotk9oThXMLRry70bjWMg81R681Vb0/rEkILMKvKQgzGEEAkz3iufvuCTzgcDljnXPlLK9H6LDj6LllJe/un0fpotC1JKQS+2UAg9EKUCokeGe2tnRT0Ng8CfE0NWG1Hk3m4wVcVMY8xWX8Q7q0NGv81PVXT7PNyu7thafXKz1+ys5pYCgd2PaKtaYVzz1mu1aD1WsibO2FWVlarolSkBSiYxJJpE41oIw+3xMd4IomtWi3HUJ5MJJCShUrunMqThOI2dldQb1ZsYIULIwCMQQ2kQasK0TZ8iy3jjFwGYpwnFbBoG0uqupTdykr5RCREg85Qxz2Sa6foZpqzNtBd5xSRKoupg30kgAzIwPSzwyjEhY0dZwY5Bv/DFXE6PssTyLWz6MbctlPYc81yNmtS1KSw407eI5UFkoWm8cVIJSSYOeBwGyvNXNGMtklCr6gM/qgXTAIABklU/hG810gaJs5+gZI/u0+6p2dHso6LDSepCR5Cjc3sOEa/pm1dTafNVDDQ+cmOjHaSkDumfy10z0h6sLctqltlCEcihRKiUpCry0wIBjIcMaBbToYtJKXUOcuom42kYABQSlRMG+VKMBKdmM4isre69dow21XVGdgV/KRWro+28kttzDDZw20Tah6tXrUVPt4tEcxX14CsRlgIw4jdXW8IxCYH3Rl3Y1UqbATof0kMJ5oISMACpJUrE883U3rx64nhW87r5Z1pm6X1EHFRba27AtRKR1DGTWyGUKE3EHjdT7qjXY2/skfoT7qewxHteEFJDqWGEAKCQlfL4YSCEI2xgZ7q57rfpiyum5ZiFJkEkIUgAgbAo47NgGJw211g2Bk52dr/DR7qarRNnP/LM/4SPdT6oHzml0BwK2BQPccagIjDdX0S9oGyYTZbNjvZbz7qFvSHqyx8kW4yw22tuFShCUSAecDdGOEnsqQGdTnYSPwin2i1gWO1NkYh5K07hya1hXelcVR1bXdaSeHtNRuOHk7UvMAkEf3iroPZTngNnQOni3Zwm4kicZrQtWnSuCBAKQcCcZkGe0Gg7R1oTyRSTGOFXLHaEZKMgJ2GdpOzrNY4245vT5ccMvp8cpreu7f0ynlWLMdtx09l8geVe6Otii0Jxjmnsypyn2bwZdlKUISkEYkGLyv4lHuqm++ykFCCpSSZJBKCdmw+FabcHRv3Ti3FRwEzJwxI7Bs48azrfpwklFnSXFb8wBllsGWe6vDbUhJQhN0HccagafKRCU3R1Z8STnSOyb8rQ0jbTmwxPYPC9XlVTalb/4h769oLc+WuTXgcI200mmE1bNPeBzAPYKcmPgmoEnGlfoAu0MhcNvIa5QXCwo3ouc5Sgogg4QuJG4VTt+oa7Q+2r5QQhckEovAbbuYiPGaIfR27+4XInnnPqTRTo5IDYAwE4RVaJxXWjQXyV5SRBSWwJAugkQDhsJgE9dY2j0G6MsjsNHPpCswCFqGEFXeoFR8aDtGp/djqPtpGG7l+0NpI6TiR3qFd30lbORsy1pxKEEgbCQMB31xvQllvW9gffn9IKpro+vNrKLKsDak8doAw7T3UhJu6CKPSFpAc0BoD+6V62O08aavXzSB9dA6mfeDQskYj8nqD6tehOGRy+zTvqdr6YJTrtpD7YbfoU7PyVK3r1pLY+Nn0Kdv5KGCnPA+t9GndXqRlgc0/Rp3UDU/AtRr/pP7VJ62OMfVFdJ1A06u02Y8sRyjbqmyQLoIEFJjqI7q4QMsjl9kj61dE9FNr51paxg3VjmhORUFZZ5pxpwspNDTWxwgpU2gLc6ABMApMlQxw9UeO+hezvONOJvNNoRHNDV7BRJkH1Rhwoh1hlSUY5L4blZznnWFpexrcSEoWEKVABJIF0RKjGwdXjWWfnseHhq6CgqWQB0lT1k7ewCna66QVZ7E6tCrqyAlJGYKjEiAdk1nejlEWSZvStyFHaL6oOO8Vm+lm1/u2GvrLKiLwT0RG3PpZVpEUHo1ktQztTv+I4n/wCMjxr3/ii0/wDm3Nn0+/rbrI5QiYKhnlaUJ27opKcVleXs/wCZQdnVVE1/+LrXstbn+IhXmBSOuVtH/Nr/AMg7Y21hcqcOcvZm+g+ymknerL7VJ29VAECdcbaTjaiQL2abPsHUfjdXT2HxarIL2Idax/MmFe2uIi9j09vrhWcV1bUS03rKkGeaSMc8cfbSojnGiLfchi5KwVJz2gmdlbGjrAp2yWy6JIcaJHALWT7Kis2jR+3OTkgB8uYdXKx1HLtor1UblrSX94rwUs1UDNsPo/cWlC+WSnAKuhE4ZwSSMY2xVtzRKlXLME3xfSXHJCYuqhWAHAx8Guj6FYSixIujNMniTj7aylXUIJCQJUSSNpJn20rA5VbnLzrivrLUe9RNQg1HylK/SNS0lblJVdTOWNUHVrgEkY5A4+dS6R6Z7PIVE9KrpgmMOqjR7pXlb/AUq9C6VBbGZNMJpxqNRpg8KppVTSa8mgOjej0f2dZ++fJNF1hPMoS1DB+SKjMrV5CiqwH93NWTnXpCfIbWm7gqSDxCTNB2i/m09R9te6/vKctbmJISoJHAJSJjrJVXmiR+7T1HzNSHupSQvSCfuIUT2wB51u+kp+G7u8oGd3K8Tj2iqHo2Ym1Whe4JT34nyqP0lPEuJTjmTgkKyATt6qmqx8hEHH9Hrj6vx10pw7PtBvpJSZyPqfRp3fHVTYMZHI/Rp39dJZyo3DMxzxurzDcPV9fhSIO45n6JO6khBkYK9X6NO6gjQMMhl9oN9Fno3tQRbwnAcolxHSBxi/ls6FDTLJUQIOO9CU7d5yq7oVxTNsYWQRDyJ5qYAUq6ecknYTRL3Oy6dn0w1eawiQoESY86Hbcs3F77iu4A4cKJtIollwfdnDPsoScbW4l5rJwJLeOABULsnsM1PJ5Th4aeoDV2wMcUk/qJPtoM9JtpK7WlAvEIQkYNpWJJk4no4RRxoq0sWVDNkU6C4hCUHOCY3xAnjXKda3g5bnlQk/vLsnlJ5sJ2YbKuItUy0rE3F7f+WbO3fONMKVSearP/AMu3sFRqS3GTUxji8NteFtMnmtHFXrLGziqmCuEbFZpzZTUZiMYy2txt4VIIHqpzTk5Gzif96byhjM5fbJ30B6YIMXTifVVvGcV0L0Zvy0tMjAg4TG0bcaBWLKpwKg5EnFye4pyPXRN6OrVdeWhRiUKzWFdAgnHZnSolaVuZu6ds6o6bZPaEOJ9gq3qlaFD5agNlSVvOAkEYdLZtwM1at1k5W3WO0tKS4hBWhwpUDdvJN2esq8RQFa1KD646PLP/AKgdneO+qngO86CVesTcfUH8orGtXzSus1d1NcvaPb2/uwD2JA9lUHPmnOs0Bx4mlNNmlNSarb0DMziM9mFUoGxcd48q3GzhT0AbQKAwAE/XHx2UqIoG6lQGhys5JV5edMKju8R7KlphpgyTwqRJEcaZNOoDpeog/sn5ledb7doDbClqMBIUoncBJof1GP8AY+1XnWfrzb1GztWVv5y0OXfygi92SUjqJqyBFsaLljdtKhi7aCRwCQvDvUR2VT0YuGgeB8zRXrTYQzYEtAzcVExE81dCeiOgnt8zUm90HrdaEBaEJZBAAnkwCc8SUkTUetrinUsWhYlTiVhUJMBSVGYAUIBzjGqOrbSflxbUJSoqEeIrR0wibGB9m+RnEBad/WKk8Q7Anon1PVP1fxV6yyDsgQZJQYHcqeyvDns9T1/u/HXU9kSJA5t6THOmTs86Sqv2myMJYZN10uLDipCBAAWUJvAqx6CogioLJo28L8gARmgyY4TRC/ZVLabJPOSzhJUSol10gAicccKHw8ErAUEqIUJSVHPLHeeG2BSz+Dx17ty06PabaTgARiDgmJEmSc53b6wyzetDYg4qRzrv3tipw7qm084SYWkJVBzJTuERWlohJcfsyFQbiVEZ9GLwB7U+PGs+OVrnl9tx9ll7XK2BK1B3CCRhsGVYb2uloUkYi/eCiuTJjZBwAjCi7XRhtFjcIQkHAAgAGSQNnXXK6105pXQ7LYn3UfKVSq+kOJUFCQQBAIwByxw2Gh3SKSLQsXhismJc2qJGRuyR2UcaoPBdhbG5Ck90ihPS8h68L8KSg4ZYAJOHWk055KtDQeikmOVVeN2bqFuHeQIvSdk8J66k03oLm8ozhjilTq81AxHOhORwJ2Vl/LVi6WeVQq6nnBsSCObs31b0iLQhAClEpWApQDaTiAYmDxq6QcLqgYmOiMHo2YjOoy4TtOz6YHbT3EG8cFZj6FO7rqMJOGCs0/QpqDSWW3qTIClCcc0rOGUHZFa2gWFLS+4lJUspUAcFYrkqy2kJP6qxACBkoYfZJHrfGFdB1QstxgHaoycANgGQotEkDdn0o82420lISXSjPMwogEbjIjsqZaFOX0pEq+Uvqu74CSe2JqWUu6ZaSQLqVJEfhSV+ZrQ1QTNtE5G0Pfy/7U4HQvRzaQvR4gzdKh7fbXrnzS+uhjVO3/ILQphZlm0C+3sCV/V6tk8U8aJSqWlnj7qYcaXXgpy9lJIqTOSeFPDnA09tNOKBQDeVHHuryn8lSoDRNMVUSrWNmPVj5U0rMSQR2eZyFMJTSKxVYq2nvPvwT/FVhtOX9BPfn2KNAdI1Kc/skcVVk6HItGkS4ZIYQsJEGAroyTEAmVbfVrGXrKuyWZtKEgla3MTlCbkjrN6tj0ezybrxkcoTgYyEme9R7qrZG68uA2dYBxCzI2xCooG0UuEJ7fM0Va9KlqR9c9xmR1e6g3RiuaO3zpGqJd5O2tr++PEx7aIbc3LdrR+cYT0FbtuBoU03zXEq3eyDRc0u89GxxN0/nRHmamieQeZ3K9T6MbAPjhUtmUQtJN6AozzABGG3ZRP/AMAuLQ0psoVfUhBzMAm7ykA4JAxIxwxqfSvo1cbKi0+w4kBRAlaVmcAmJInjMdVGq0vlp25ltDYWVpKkMoSADJKiAQQNo516d1BOipC75vc2CAUJEkUy1WF1JHLIU3ISBygKAQhISAJWJgADumqjQA2DZ8fOVN7ibEWnXQpJAByIHNBxwM7Ns576sajNFVocWZhIIEgCJOEbxE0NXiZAAPNOwHDI/SZRRnqRZghDisipyP0id5+v4UsMdDK9k3pDP9kI+8k/xD31y410b0jWoBkIJxURA6iCfZXODVsnQ/R7af3Kk7lHxxrL0woHkzzcFKRiFeqbwiNvOOe6vNQH4U4nfBp7jZUt1CQSQ5eAE5XilWRG9PdSnk74Z2h0NFYvFsC4YI5SZmU9LCCcOEzwrS0lbUFsoUoYJAum/Au4gyBzpB86ia0VaMwheX3v/sNWLNoN1xYCjyYIOJUpI4Tz86og0taCSRyf+bupouyOhmj7TdW/atAvp3Kz6LqjGwTj5TVX9k2ifm17Mi4cs6NDbLaSkwBcxAGHKbVV1SwpDbaU/VSPLGgnR2hnr6byFpgpxJXEAycTuon09a+TsziwYN0gdasB51NOBTVJ7ldKoXObjiuy6qPCK2tEqKG12kZt2szxCgnDtIjtoc1GbV8uZgkQokxtAGI7RRxqTYw8zaUHIurA4KKQAesVcI7S6Js7Dqc0KTEnEXkgCT+K7RHo60BdkKt4nwFULXZyuxoRtKCB+IAFPjFCmhdY3UrNmKCEqC5Sc0mFKJykY+dAYBqZA41ER8fHurwqEx8dwk+FSa6gV6Kro4T4Gkl87R8dlAWqVQ/KBSoDRiKgfMY+OXjh/MKsGq73xs9x8ew0whjHieuT3Qo/xVNZdvXjHtuj+ZNJFmVlEA74A7ox7UjrqVVxAlSsu4eZHeKQEOjbO27ZlJcSFXVKUJEwoAQRxxq3q2+QzdnIKnr20O6D06zcdSpV0Y3SZxkbs9lberACrOpYiLquzDbuNVsmbrTab1nPFST4UK6MPN7TW5rClXJNQQQ5dHJwL16CBB8Ki0dq+8EnlE8lGMrOBn8F7dShhvTycJ41pWa1m40sGCEpx4pw9lbTurDi8lsK4cqB/MBUB1Mfj5iR9xbav5FUaCs1rG82q8ktz/doHdAEVZXrm8qLyGVRGaFbMdiqrP6rLGdmfT+Ryqi9Axm24OsLHnRqjdap10cOBZYMZSlw/wCuola3LP0NnH5FHzVWWdDoHqr7b1L9mNx82qetdGqN1cc1leOXJJ6mm/aDRPq88SwkrUJM7EpgTAACQAMqD7Lq9ypIQ2tUJKjBOCREngBNXrHqc46SG2FqjOFjDdPO20aC1rcnlVBKVDBOYgxJ/pQk9oVYGBCuGVGjOqtqbF1NnUMcpbz486pEatW77BX8Hvo0QM1deLD4vykHAzhV/SFqCbQpaFAwq8k5ic6JrTqraynn2VShuIT4Y1gu6tpN5Qbm6krUEqGCRmYScBRo2YLaqZvqHUoj21KjSTux5wf+or31eY0A3tbPaFd2NXLPoJG1gHso6KNsf9rPfbuf4i/fTVaTdObzh/8AUV76I16spOKbMe4H20waqq2WNw9TSleQpdA2xNH2sld1TnNVAVeM80EKOeWVauslsQ9daQtKsbyiCIw6IJ6/KtCz6oPYFNiIP3ghv/3CK0BqnaVDo2dHBSwo/wCUFU5iNhLUJlSdIi9iQlZnflj40Y+jl6E2gja97BTG9TrSyC40pCnE5BF6TMAiXEJA39lRaB0HbbMFJVcZSo3ryilZkCCAAY3Z1U7E2HXv7Oyrir2U1LCPk7rl1N8pUCqBegA4TnFVdFr5SwpVhCFqvHYMJk7hjVC0awsoszqQoKVK4TlMyMDt7KkBR1Pl8bvE1XOXDw9g7ga0bOW3UgiQR2x1jGPCoXbCRikgjgcfPHvpG8sYxA+PjsFeFNSWVEEDjll4YeVPoCCK9qW7XtAaaglIlR9g7zWXbNONg8wXzEc0QP1baINHej110hdrej/po5xHaeaD1A9dFth1Zstnjk2wCPWPOV3nLspdQcvs7Nuf6DagOAgfqXga0W9UHlD986lPC9fI6gnDxrobjQO32U1NlTupbPTnOk7FZWWyy0kuvSJdXgEYi8EgHPZtzOOyqFibcaN5lZblN1YgEK3zgJHXlvq1btEWgKU4gFaSonDE57qp33hm2e0RVzRLIJvNrViUOoWISlIhBkJEZDjjRUNbyfov4v6UEG0L2ppyLQv6h7JquxDlrWhO1o9hSfdVtvWRna0ruR76ABalfUX4+6vBbVfVX8dlMD6z62BJ/wDDLjel6J60wB41cZ1vaBJ5C0jgHEkDqF+ubHSEZ3hUj1tGbalEEesADO0YHKgOhu+kGzIgKTa0nZik4f4lJPpHsn1rT2ttn/VXL3TeBnPMVSSugOsWnX6wuIUhYcUlaSlQ5K6Sk5i8lcjsqnovWbRVn5TkUvtlxN1SgXFHbEX1Kg41zQnGnXqQHdkt2hEpUhQtK5JN9SJXjxCADtMnfWzoHXTRtja5Jty1rA6PKJmOAhIgcI21ysKr0qoDsD3pMsKklJD5BERc39orC0frNoqzrDjLDyFgETCl4HOL7pHhXO71K9QHWVek+z5f2vsS2n/XWI/6S3+XvJCeQBjk1KcK1DeVjBKuABA41z+9XqDJoDs1m1+ZWJDLx4Fwe+fAUndcE+rYyr8T8DwSquUWFwpxBrXGkW0g3i6VYRF0DjmCaoD9jW1BErsyUK+4sLHeUpNOc10A6LJ7VAeQrnK9Kp+q53j/ALahOlAckK7z7BSA+d12cnBsfqPurI05p5dpSApATF66QZIJu44gj1fE0LKtx+pHaach5w5N+320dgmtNlWpoM8oQ3evFCQlIUrDFQSADlWa22lpX7xhK2iCDneGfOSsdE49WEVqITaDk2e6akXZnVNrKxCRAVIKc+EcR3ilZAVn1VS6gO2V4lJnBeCkkZgqTt7Ko2vRFuaxulXcvxHO76MNTbDyLS0FUyQsbBBTs7j3VuFuaxuWlacps+mlIUA4i6UmZGMEcK1G3GnMRhxTiP0n2Gje26Cbf+dbSrjHOHURiKGNJ6iFBK7O4fwq8gobOsU5kNKBsW5ae8j2UqprRakG6UCR8b68p7J2NTlUn3iTSpVJmCvQaVKgMOw2kiUnYSO6p0q4nspUqAxdJW60ItLbaYLaokmJz52e4Y1qvWVKxdViOoUqVMmcdXm8doPWPEH2VI1opKB802RvIST3kA0qVG6DLRZEKBCmkwcDHNPhQdpKzfJ1qTF4ZpxzHGNtKlVShAhy8ZgDHIVK7oZw85MQeNKlWhGjQzv3e/8ApTv2I793vpUqNEX7Ed+73079hu/d76VKnoF+wXfu9/8ASkdBO70d591KlRo3g0C8dqO8+6mPaPU3AVHZSpUtA9Fqu824Dx2iibVnRIMvLxnBI4bzSpVGVEbwszYyQgD8CanbSn6o7hSpVCkySNgqjp5boZVyEX8Iyy2xOExvpUqQRWJDnJJ5Qi/HO6+yq7rYgpIkEyeJpUqJe4amgWVKQVcbo6kj+ta6ERSpUqDyajWaVKkaAtJ3UqVKkb//2Q==',
      videoUrl: '/vid.mp4'
    },
    {
      id: 2,
      title: 'Advanced Warehousing',
      description: 'State-of-the-art facilities with automated systems for efficient package handling.',
      thumbnail: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=450&fit=crop',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_2mb.mp4'
    },
    {
      id: 3,
      title: 'Express Delivery Fleet',
      description: 'Modern vehicles equipped with GPS tracking for real-time package monitoring.',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_5mb.mp4'
    }
  ];

  const handleVideoPlay = (videoId: number) => {
    setActiveVideo(activeVideo === videoId ? null : videoId);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-foreground mb-6">
            See Our Services in
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Watch how SpanTrue Courier delivers excellence through cutting-edge logistics solutions
            and world-class service standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative aspect-video overflow-hidden">
                {activeVideo === video.id ? (
                  <div className="relative w-full h-full bg-black">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      muted={isMuted}
                      poster={video.thumbnail}
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Video Controls Overlay */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        onClick={toggleMute}
                        size="sm"
                        className="bg-black/50 hover:bg-black/70 text-white p-2"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={() => setActiveVideo(null)}
                        size="sm"
                        className="bg-black/50 hover:bg-black/70 text-white p-2"
                      >
                        <Pause className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Video Thumbnail */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-all duration-300 flex items-center justify-center">
                      <Button
                        onClick={() => handleVideoPlay(video.id)}
                        size="lg"
                        className="bg-white/90 hover:bg-white text-primary hover:text-primary-dark rounded-full p-6 group-hover:scale-110 transition-all duration-300 shadow-2xl"
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </Button>
                    </div>

                    {/* Video Duration Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      2:30
                    </div>
                  </>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6 bg-card">
                <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Hover Accent Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-2xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Experience SpanTrue Excellence?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of satisfied customers who trust us with their shipping needs.
            </p>
            <Button className="btn-accent text-lg px-8 py-3">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};