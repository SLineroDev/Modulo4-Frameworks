import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import { MyContext } from './context';

interface MemberEntity {
	id: string;
	login: string;
	avatar_url: string;
}

export const ListPage: React.FC = () => {
	const [members, setMembers] = React.useState<MemberEntity[]>([]);
	const { org, setOrg } = React.useContext(MyContext);

	const searchOrg = () => {
		fetch(`https://api.github.com/orgs/${org}/members`)
			.then(response => response.json())
			.then(json => setMembers(json));
	};

	React.useEffect(() => {
		searchOrg();
	}, []);

	return (
		<>
			<div>
				<label>Organization: </label>
				<input value={org} onChange={e => setOrg(e.target.value)} />
				<button onClick={searchOrg}>Buscar</button>
			</div>
			<h2>Hello from List page</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Avatar</th>
						<th>Id</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{members.map(member => (
						<tr key={member.id}>
							<td>
								<img
									src={member.avatar_url}
									style={{ width: '5rem' }}
								/>
							</td>
							<td>
								<span>{member.id}</span>
							</td>
							<td>
								<Link
									to={generatePath('/detail/:id', {
										id: member.login,
									})}
								>
									{member.login}
								</Link>{' '}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
