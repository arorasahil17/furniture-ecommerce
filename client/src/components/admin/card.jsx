import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function CardComp({
  title,
  description,
  linkName,
  route,
  image,
}) {
  return (
    <Card className="max-w-[400px] shadow-md">
      <CardHeader className="flex gap-3">
        <Image alt="logo" height={40} radius="sm" src={image} width={40} />
        <div className="flex flex-col">
          <p className="text-md font-semibold">{title}</p>
          <p className="text-small text-default-500">ACME</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-slate-500">{description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link to={route} className="flex text-sm text-blue-600">
          {linkName}
          <ArrowTopRightOnSquareIcon className="h-4 w-6" />
        </Link>
      </CardFooter>
    </Card>
  );
}
