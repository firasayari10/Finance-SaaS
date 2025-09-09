import  {Upload} from "lucide-react" ;
import {useCSVReader}  from "react-papaparse";
import { Button } from "@/components/ui/button";



type Props ={
    onUplaod: (results:any) => void ;
};

export const UploadButton= ({ onUplaod}:Props) => {


    const {CSVReader} =useCSVReader();

    //to do : paywall
return (
                <CSVReader onUploadAccepted={onUplaod}>
                                {({getRootProps}:any) => (

                                    <Button size="sm"
                                    className="w-full lg:w-auto"
                                    {...getRootProps()}>
                                    <Upload className="size-4 mr-2" />
                                    Import
                                    

                                    </Button>

                                )
                                
                            
                            }

                </CSVReader>


)
}
