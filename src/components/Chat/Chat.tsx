import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

type Chat = arrChat[];

interface arrChat {
	id: number;
	name: string;
}

const text = {
	color: "#2f7e92",
	fontSize: "16px",
	lineHeight: "16px",
};

export const Chat = () => {
	const userChat: Chat = [
		{
			id: 1,
			name: 'first',
		},
		{
			id: 2,
			name: 'second',
		},
	];

	return (
		<List
			sx={{ width: "150px", height: "100%", maxWidth: 360, bgcolor: "#f3f3f3" }}
			aria-label="contacts"
			subheader={
				<ListSubheader
					sx={{
						bgcolor: "#f3f3f3",
						fontFamily: "'Courier New', Courier, monospace",
						fontSize: "16px",
						fontWeight: "600",
						color: "darkgreen",
						lineHeight: "35px",
					}}
				> Чаты
				</ListSubheader>
			}
		>
			{userChat.map((item) => (
				<ListItemButton key={item.id} sx={{ padding: 0 }}>
					<ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
						<ListItemText
							primary={`${item.name}`}
							primaryTypographyProps={{ style: text }}
						/>
					</ListItem>
				</ListItemButton>
			))}
		</List>
	);
};
